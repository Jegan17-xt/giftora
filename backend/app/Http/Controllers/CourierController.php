<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Admin: couriers, their rate cards and the pool of pre-printed tracking codes.
 * Assigning a courier to an order lives with the order workflow in AdminController::updateorderstatus.
 */
class CourierController extends AdminController
{
    private const UPLOAD_DIR    = 'tracking-uploads';
    private const HEADER_LABELS = ['tracking code', 'code', 'tracking_code', 'trackingcode', 'awb', 'awb number', 'awb no'];
    private const MAX_CODES     = 20000;

    // ── Couriers ──────────────────────────────────────────────────────────────

    public function fetchcouriers(Request $request)
    {
        $a    = $this->auth($request);
        $rows = $this->scope('giftora_couriers', $a)->orderBy('name')->get();

        $orders = $this->scope('giftora_orders', $a)->whereNotNull('courier_id')
            ->select('courier_id',
                DB::raw('COUNT(*) as total'),
                DB::raw("SUM(status IN ('pending','confirmed','packed','shipped')) as active"))
            ->groupBy('courier_id')->get()->keyBy('courier_id');
        $codes = $this->scope('giftora_tracking_codes', $a)
            ->select('courier_id', DB::raw('COUNT(*) as total'), DB::raw('SUM(oid IS NULL) as unused'))
            ->groupBy('courier_id')->get()->keyBy('courier_id');

        foreach ($rows as $r) {
            $r->order_count  = (int) ($orders[$r->cid]->total ?? 0);
            $r->active_count = (int) ($orders[$r->cid]->active ?? 0);
            $r->code_count   = (int) ($codes[$r->cid]->total ?? 0);
            $r->unused_codes = (int) ($codes[$r->cid]->unused ?? 0);
        }
        return response()->json(['status' => 1, 'couriers' => $rows]);
    }

    public function savecourier(Request $request)
    {
        $a    = $this->auth($request);
        $cid  = trim((string) $request->input('cid', ''));
        $name = $this->clean($request, 'name', 150);
        if ($name === '') return response()->json(['status' => 0, 'message' => 'Courier name is required']);

        $url = $this->clean($request, 'tracking_url', 500);
        if ($url !== '' && !preg_match('#^https?://#i', $url)) {
            return response()->json(['status' => 0, 'message' => 'Tracking link must start with http:// or https://']);
        }

        $data = [
            'name'           => $name,
            'contact_person' => $this->clean($request, 'contact_person', 150),
            'contact_number' => $this->clean($request, 'contact_number', 50),
            'tracking_url'   => $url,
            'status'         => (int) $request->input('status', 1) ? 1 : 0,
        ];
        $logo = $this->saveUpload($request, 'logo_img', 'couriers');

        if ($cid) {
            $row = $this->scope('giftora_couriers', $a)->where('cid', $cid)->first();
            if (!$row) return response()->json(['status' => 0, 'message' => 'Courier not found']);
            if ($logo) {
                $this->removeUpload('couriers', $row->logo_img);
                $data['logo_img'] = $logo;
            }
            $this->scope('giftora_couriers', $a)->where('cid', $cid)->update($data);
            // Orders show the courier by name, so keep that copy in step.
            $this->scope('giftora_orders', $a)->where('courier_id', $cid)->update(['courier_name' => $name]);
            return response()->json(['status' => 1, 'message' => 'Courier updated']);
        }

        DB::table('giftora_couriers')->insert($this->tenant($a) + $data + [
            'cid' => $this->uid(), 'logo_img' => $logo, 'created_at' => now(),
        ]);
        return response()->json(['status' => 1, 'message' => 'Courier added']);
    }

    public function deletecourier(Request $request)
    {
        $a   = $this->auth($request);
        $row = $this->scope('giftora_couriers', $a)->where('cid', $request->input('cid'))->first();
        if (!$row) return response()->json(['status' => 1, 'message' => 'Courier deleted']);

        $active = $this->scope('giftora_orders', $a)->where('courier_id', $row->cid)
            ->whereIn('status', ['pending', 'confirmed', 'packed', 'shipped'])->count();
        if ($active > 0) {
            return response()->json(['status' => 0, 'message' => "This courier is carrying $active order(s) that are not delivered yet. Reassign or finish them first."]);
        }

        foreach ($this->scope('giftora_tracking_uploads', $a)->where('courier_id', $row->cid)->get() as $up) {
            $this->removeStoredSheet($up->file_path);
        }
        $this->removeUpload('couriers', $row->logo_img);
        // Rate cards, uploads and unused codes go with the courier; past orders keep its name.
        $this->scope('giftora_couriers', $a)->where('cid', $row->cid)->delete();
        return response()->json(['status' => 1, 'message' => 'Courier deleted']);
    }

    // ── Rate cards ────────────────────────────────────────────────────────────

    public function fetchcouriercosts(Request $request)
    {
        $a    = $this->auth($request);
        $rows = DB::table('giftora_courier_costs as k')
            ->join('giftora_couriers as c', 'c.cid', '=', 'k.courier_id')
            ->where('k.profile_id', $a['profile_id'])->where('k.subdomain', $a['subdomain'])
            ->orderBy('c.name')->orderBy('k.avg_weight_grams')
            ->select('k.*', 'c.name as courier_name', 'c.status as courier_status')
            ->get();
        $homeState = (string) $this->scope('company_info', $a)->value('state');
        return response()->json(['status' => 1, 'costs' => $rows, 'home_state' => $homeState]);
    }

    public function savecouriercost(Request $request)
    {
        $a      = $this->auth($request);
        $ccid   = trim((string) $request->input('ccid', ''));
        $cid    = trim((string) $request->input('courier_id', ''));
        $weight = (int) $request->input('avg_weight_grams', 0);
        $home   = round((float) $request->input('home_rate', 0), 2);
        $other  = round((float) $request->input('other_rate', 0), 2);

        if (!$this->scope('giftora_couriers', $a)->where('cid', $cid)->exists()) {
            return response()->json(['status' => 0, 'message' => 'Choose a courier']);
        }
        if ($weight < 1 || $home < 0 || $other < 0) {
            return response()->json(['status' => 0, 'message' => 'Enter a weight above zero and rates of zero or more']);
        }
        $data = ['courier_id' => $cid, 'avg_weight_grams' => $weight, 'home_rate' => $home, 'other_rate' => $other];

        if ($ccid) {
            $this->scope('giftora_courier_costs', $a)->where('ccid', $ccid)->update($data);
            return response()->json(['status' => 1, 'message' => 'Rate updated']);
        }
        DB::table('giftora_courier_costs')->insert($this->tenant($a) + $data + ['ccid' => $this->uid(), 'created_at' => now()]);
        return response()->json(['status' => 1, 'message' => 'Rate added']);
    }

    public function deletecouriercost(Request $request)
    {
        $a = $this->auth($request);
        $this->scope('giftora_courier_costs', $a)->where('ccid', $request->input('ccid'))->delete();
        return response()->json(['status' => 1, 'message' => 'Rate deleted']);
    }

    // ── Tracking code pool ────────────────────────────────────────────────────

    public function fetchtrackinguploads(Request $request)
    {
        $a    = $this->auth($request);
        $rows = DB::table('giftora_tracking_uploads as u')
            ->join('giftora_couriers as c', 'c.cid', '=', 'u.courier_id')
            ->where('u.profile_id', $a['profile_id'])->where('u.subdomain', $a['subdomain'])
            ->orderByDesc('u.id')
            ->select('u.uid', 'u.title', 'u.file_name', 'u.total_codes', 'u.created_at', 'u.courier_id', 'c.name as courier_name')
            ->get();
        $used = $this->scope('giftora_tracking_codes', $a)->whereNotNull('oid')
            ->select('upload_id', DB::raw('COUNT(*) as n'))->groupBy('upload_id')->pluck('n', 'upload_id');
        foreach ($rows as $r) $r->used_codes = (int) ($used[$r->uid] ?? 0);
        return response()->json(['status' => 1, 'uploads' => $rows]);
    }

    /** Accepts a spreadsheet (.xlsx / .csv / .txt, codes in the first column) and/or codes typed one per line. */
    public function uploadtrackingcodes(Request $request)
    {
        $a     = $this->auth($request);
        $cid   = trim((string) $request->input('courier_id', ''));
        $title = $this->clean($request, 'title', 255);
        if (!$this->scope('giftora_couriers', $a)->where('cid', $cid)->exists()) {
            return response()->json(['status' => 0, 'message' => 'Choose a courier']);
        }
        if ($title === '') return response()->json(['status' => 0, 'message' => 'Give this batch a title']);

        $codes    = $this->codesFromLines(preg_split('/\R/', (string) $request->input('codes', '')));
        $fileName = '';
        $filePath = '';

        if ($request->hasFile('sheet')) {
            $file = $request->file('sheet');
            $ext  = strtolower($file->getClientOriginalExtension());
            if (!$file->isValid() || !in_array($ext, ['xlsx', 'csv', 'txt'], true)) {
                return response()->json(['status' => 0, 'message' => 'Upload an .xlsx, .csv or .txt file']);
            }
            if ($file->getSize() > 10 * 1024 * 1024) {
                return response()->json(['status' => 0, 'message' => 'The file is larger than 10 MB']);
            }
            try {
                $fromFile = $ext === 'xlsx' ? $this->codesFromXlsx($file->getRealPath()) : $this->codesFromCsv($file->getRealPath());
            } catch (\Throwable $e) {
                return response()->json(['status' => 0, 'message' => 'Could not read that file. Check that the codes are in the first column.']);
            }
            $codes    = array_values(array_unique(array_merge($codes, $fromFile)));
            $fileName = mb_substr(basename($file->getClientOriginalName()), 0, 255);
            $stored   = $this->uid() . '.' . $ext;
            $dir      = storage_path('app/' . self::UPLOAD_DIR);
            if (!is_dir($dir)) mkdir($dir, 0775, true);
            $file->move($dir, $stored);
            $filePath = $stored;
        }

        if (!$codes) {
            $this->removeStoredSheet($filePath);
            return response()->json(['status' => 0, 'message' => 'No tracking codes found. Add a file or type the codes in.']);
        }
        if (count($codes) > self::MAX_CODES) {
            $this->removeStoredSheet($filePath);
            return response()->json(['status' => 0, 'message' => 'Too many codes in one batch (limit ' . self::MAX_CODES . ').']);
        }

        return DB::transaction(function () use ($a, $cid, $title, $codes, $fileName, $filePath) {
            // Codes we already hold (from an earlier or overlapping sheet) are skipped, not rejected.
            $existing = [];
            foreach (array_chunk($codes, 1000) as $chunk) {
                $existing = array_merge($existing, $this->scope('giftora_tracking_codes', $a)->whereIn('tracking_code', $chunk)->pluck('tracking_code')->all());
            }
            $fresh = array_values(array_diff($codes, $existing));

            $uid = $this->uid();
            DB::table('giftora_tracking_uploads')->insert($this->tenant($a) + [
                'uid' => $uid, 'courier_id' => $cid, 'title' => $title,
                'file_name' => $fileName, 'file_path' => $filePath,
                'total_codes' => count($fresh), 'created_at' => now(),
            ]);
            $now = now();
            foreach (array_chunk($fresh, 500) as $chunk) {
                DB::table('giftora_tracking_codes')->insert(array_map(fn($code) => $this->tenant($a) + [
                    'upload_id' => $uid, 'courier_id' => $cid, 'tracking_code' => $code, 'created_at' => $now,
                ], $chunk));
            }
            $skipped = count($codes) - count($fresh);
            return response()->json([
                'status'  => 1,
                'message' => count($fresh) . ' tracking code(s) added' . ($skipped ? ", $skipped already known and skipped" : ''),
            ]);
        });
    }

    public function deletetrackingupload(Request $request)
    {
        $a   = $this->auth($request);
        $row = $this->scope('giftora_tracking_uploads', $a)->where('uid', $request->input('uid'))->first();
        if ($row) {
            $used = $this->scope('giftora_tracking_codes', $a)->where('upload_id', $row->uid)->whereNotNull('oid')->count();
            if ($used > 0) {
                return response()->json(['status' => 0, 'message' => "$used code(s) from this batch are on orders, so it cannot be deleted."]);
            }
            $this->removeStoredSheet($row->file_path);
            $this->scope('giftora_tracking_uploads', $a)->where('uid', $row->uid)->delete();
        }
        return response()->json(['status' => 1, 'message' => 'Batch deleted']);
    }

    public function downloadtrackingupload(Request $request)
    {
        $a   = $this->auth($request);
        $row = $this->scope('giftora_tracking_uploads', $a)->where('uid', $request->input('uid'))->first();
        $path = $row && $row->file_path ? storage_path('app/' . self::UPLOAD_DIR . '/' . basename($row->file_path)) : '';
        if (!$path || !is_file($path)) {
            return response()->json(['status' => 0, 'message' => 'The original file is not available for this batch'], 404);
        }
        return response()->download($path, $row->file_name ?: basename($path));
    }

    public function fetchtrackingcodes(Request $request)
    {
        $a = $this->auth($request);
        $query = DB::table('giftora_tracking_codes as t')
            ->join('giftora_couriers as c', 'c.cid', '=', 't.courier_id')
            ->join('giftora_tracking_uploads as u', 'u.uid', '=', 't.upload_id')
            ->where('t.profile_id', $a['profile_id'])->where('t.subdomain', $a['subdomain']);

        $code   = trim((string) $request->input('tracking_code', ''));
        $order  = trim((string) $request->input('order_no', ''));
        $upload = trim((string) $request->input('upload_id', ''));
        $state  = (string) $request->input('state', '');
        $like   = fn(string $v) => '%' . addcslashes($v, '%_\\') . '%';
        if ($code !== '')       $query->where('t.tracking_code', 'like', $like($code));
        if ($order !== '')      $query->where('t.order_no', 'like', $like($order));
        if ($upload !== '')     $query->where('t.upload_id', $upload);
        if ($state === 'used')  $query->whereNotNull('t.oid');
        if ($state === 'unused') $query->whereNull('t.oid');

        $perPage = 50;
        $page    = max(1, (int) $request->input('page', 1));
        $total   = (clone $query)->count();
        $rows    = $query->orderByDesc('t.id')->offset(($page - 1) * $perPage)->limit($perPage)
            ->select('t.id', 't.tracking_code', 't.oid', 't.order_no', 't.customer', 't.order_date',
                     'c.name as courier_name', 'u.title', 'u.created_at as uploaded_at')
            ->get();

        $all  = $this->scope('giftora_tracking_codes', $a)->count();
        $used = $this->scope('giftora_tracking_codes', $a)->whereNotNull('oid')->count();

        return response()->json([
            'status' => 1, 'codes' => $rows, 'total' => $total, 'page' => $page, 'per_page' => $perPage,
            'stats'  => ['total' => $all, 'used' => $used, 'not_used' => $all - $used],
        ]);
    }

    // ── Reading codes out of an upload ────────────────────────────────────────

    private function removeStoredSheet(?string $file): void
    {
        if (!$file) return;
        $path = storage_path('app/' . self::UPLOAD_DIR . '/' . basename($file));
        if (is_file($path)) @unlink($path);
    }

    /** Trim, drop blanks, an optional heading row and duplicates. */
    private function codesFromLines(array $lines): array
    {
        $codes = [];
        foreach ($lines as $line) {
            $value = mb_substr(trim(strip_tags((string) $line)), 0, 100);
            if ($value === '' || in_array(strtolower($value), self::HEADER_LABELS, true)) continue;
            $codes[$value] = true;
        }
        return array_keys($codes);
    }

    private function codesFromCsv(string $path): array
    {
        $first = [];
        $fh = fopen($path, 'r');
        while (($row = fgetcsv($fh)) !== false) {
            $first[] = preg_replace('/^\xEF\xBB\xBF/', '', (string) ($row[0] ?? ''));
        }
        fclose($fh);
        return $this->codesFromLines($first);
    }

    /** Column A of the first sheet of an .xlsx workbook. */
    private function codesFromXlsx(string $path): array
    {
        $zip = new \ZipArchive();
        if ($zip->open($path) !== true) throw new \RuntimeException('not a workbook');

        $strings = [];
        if (($xml = $zip->getFromName('xl/sharedStrings.xml')) !== false) {
            foreach (simplexml_load_string($xml)->si as $si) {
                // Plain cells hold <t>; rich-text cells hold several <r><t> runs.
                $text = (string) $si->t;
                foreach ($si->r as $run) $text .= (string) $run->t;
                $strings[] = $text;
            }
        }

        $sheetXml = $zip->getFromName('xl/worksheets/sheet1.xml');
        $zip->close();
        if ($sheetXml === false) throw new \RuntimeException('no first sheet');

        $values = [];
        foreach (simplexml_load_string($sheetXml)->sheetData->row as $row) {
            foreach ($row->c as $cell) {
                if (!preg_match('/^A\d+$/', (string) $cell['r'])) continue;
                $type = (string) $cell['t'];
                $values[] = match ($type) {
                    's'         => $strings[(int) $cell->v] ?? '',
                    'inlineStr' => (string) $cell->is->t,
                    default     => (string) $cell->v,
                };
            }
        }
        return $this->codesFromLines($values);
    }
}
