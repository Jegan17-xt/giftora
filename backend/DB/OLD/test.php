<?php
$docRoot  = $_SERVER['DOCUMENT_ROOT'] ?? 'NOT SET';
$host     = $_SERVER['HTTP_HOST']     ?? 'NOT SET';
$uri      = $_SERVER['REQUEST_URI']   ?? 'NOT SET';
$realPath = realpath($docRoot);

$indexHtml = file_exists($docRoot . '/index.html') ? 'YES' : 'NO';
$assetsDir = file_exists($docRoot . '/assets')     ? 'YES' : 'NO';
$htaccess  = file_exists($docRoot . '/.htaccess')  ? 'YES' : 'NO';
$htContent = ($htaccess === 'YES')
    ? file_get_contents($docRoot . '/.htaccess')
    : 'FILE NOT FOUND';

echo "<pre style='font:14px monospace;padding:20px;background:#111;color:#0f0;'>";
echo "HOST             : " . $host     . "\n";
echo "REQUEST URI      : " . $uri      . "\n";
echo "DOCUMENT ROOT    : " . $docRoot  . "\n";
echo "REAL PATH        : " . $realPath . "\n";
echo "index.html EXISTS: " . $indexHtml . "\n";
echo "assets/    EXISTS: " . $assetsDir . "\n";
echo ".htaccess  EXISTS: " . $htaccess  . "\n";
echo "\n--- .htaccess CONTENT ---\n";
echo htmlspecialchars($htContent);
echo "\n--- PHP VERSION ---\n";
echo PHP_VERSION . "\n";
echo "\n--- mod_rewrite ---\n";
if (function_exists('apache_get_modules')) {
    echo in_array('mod_rewrite', apache_get_modules())
        ? "mod_rewrite: LOADED\n"
        : "mod_rewrite: NOT LOADED\n";
} else {
    echo "Cannot detect via apache_get_modules (may still be active)\n";
}
echo "</pre>";
