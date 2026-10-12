<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

abstract class Controller
{
    private static ?array $defaultStore = null;

    protected function uid(): string
    {
        return bin2hex(random_bytes(8));
    }

    /** Trim, strip tags and cap the length of a free-text input. */
    protected function clean(Request $request, string $key, int $max = 255): string
    {
        return mb_substr(trim(strip_tags((string) $request->input($key, ''))), 0, $max);
    }

    /** The store this installation serves (first row of app_title). */
    protected function defaultStore(): array
    {
        if (self::$defaultStore === null) {
            $row = DB::table('app_title')->orderBy('id')->first();
            self::$defaultStore = [
                'profile_id' => $row->profile_id ?? '',
                'subdomain'  => $row->subdomain ?? '',
                'domain'     => $row->domain ?? '',
            ];
        }
        return self::$defaultStore;
    }

    /** Move an uploaded image into public/assets/<folder> and return its filename ('' if none/invalid). */
    protected function saveUpload(Request $request, string $field, string $folder, array $allowed = ['jpg', 'jpeg', 'png', 'webp']): string
    {
        if (!$request->hasFile($field)) return '';
        $file = $request->file($field);
        if (!$file->isValid()) return '';
        $ext = strtolower($file->getClientOriginalExtension());
        if (!in_array($ext, $allowed, true)) return '';
        $base     = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $base     = trim(preg_replace('/[^a-zA-Z0-9_-]+/', '-', $base), '-') ?: 'image';
        $filename = time() . '_' . mb_substr($base, 0, 60) . '.' . $ext;
        $file->move(public_path("assets/$folder"), $filename);
        return $filename;
    }

    protected function removeUpload(string $folder, ?string $filename): void
    {
        if (!$filename) return;
        $path = public_path("assets/$folder/" . basename($filename));
        if (is_file($path)) @unlink($path);
    }

    protected function notify(array $store, string $message, string $type = 'general'): void
    {
        DB::table('giftora_notifications')->insert([
            'nid'        => $this->uid(),
            'profile_id' => $store['profile_id'],
            'subdomain'  => $store['subdomain'],
            'message'    => $message,
            'type'       => $type,
            'is_read'    => 0,
            'created_at' => now(),
        ]);
    }
}
