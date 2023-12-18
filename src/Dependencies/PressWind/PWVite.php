<?php

declare(strict_types=1);

namespace Deaktiver\Dependencies\PressWind;

use Deaktiver\Dependencies\PressWind\Base\CSSAsset;
use Deaktiver\Dependencies\PressWind\Base\JSAsset;

class PWVite
{
    private static string $dist_path = 'dist/';

    private bool $is_plugin = false;

    private int $port = 3000;

    private string $slug = 'presswind-script';

    private string $path = '';

    private string|bool $plugin_path = '';

    private bool $is_ts = false;

    /**
     * @var string front|admin|editor
     */
    private string $position = 'front';

    /**
     * PWVite constructor.
     *
     * @param  string  $position - front|admin|editor
     */
    private function __construct(int $port, string $path, string $position =
    'front', bool $is_ts = false, string|bool $plugin_path = false, string $slug = 'presswind-script')
    {
        $this->port = $port;
        $this->path = $path;
        $this->is_ts = $is_ts;
        $this->position = $position;
        if ($plugin_path) {
            $this->is_plugin = true;
            $this->plugin_path = $plugin_path;
        }
        $this->slug = $slug;

        $this->set_script();
    }

    /**
     * init vite asset
     *
     * @param  string  $position - front|admin|editor
     */
    public static function init(
        int $port = 3000,
        string $path = '',
        string $position =
        'front',
        bool $is_ts = false,
        $plugin_path = false,
        $slug = 'presswind-script'
    ) {
        return new self($port, $path, $position, $is_ts, $plugin_path, $slug);
    }

    public static function getLegacyInline()
    {
        if (class_exists('PWConfig')) {
            return PWConfig::get('vite-legacy-inline');
        }

        return '!function () { var e = document, t = e.createElement("script"); if (!("noModule" in t) && "onbeforeload" in t) {var n = !1;e.addEventListener("beforeload", function (e) {if (e.target === t) n = !0; else if (!e.target.hasAttribute("nomodule") ||!n) return;e.preventDefault()}, !0), t.type = "module", t.src = ".", e.head.appendChild(t), t.remove()}}();';
    }

    public function setPreloadFont(): void
    {
        if (! PWApp::isDev()) {
            $files = PWManifest::get($this->path, $this->is_plugin);
            $t = '';
            foreach ($files as $key => $value) {
                // only fonts directory
                if (str_contains($key, 'fonts') === false) {
                    continue;
                }
                // get extension file
                $ext = pathinfo($value->file, PATHINFO_EXTENSION);
                $t .= '<link rel="preload" href="'.$this->getPath().$value->file.'" as="font" type="font/'.$ext.'" crossorigin />';
            }
            if ($t !== '') {
                add_action('wp_head', function () use ($t) {
                    echo $t;
                }, 1);
            }
        }
    }

    /**
     * get path after wp-content
     */
    public function get_relative_path_from(): string
    {
        if ($this->is_plugin) {

            $content_dir = explode('/', WP_PLUGIN_DIR);
            // get last two elements of array
            $content_dir = $content_dir[count($content_dir) - 2].'/'.end($content_dir);
            // current plugin dir
            $plugin_dir = plugin_dir_path($this->plugin_path);
            // remove last slash
            $plugin_dir = PWHelpers::cleanPath($plugin_dir, false);

            $_path_ = explode($content_dir, $plugin_dir.PWHelpers::cleanPath($this->path, false));
        } else {
            // get content dir name
            $content_dir = explode('/', WP_CONTENT_DIR);
            $content_dir = end($content_dir);
            // split path from content dir name
            $_path_ = explode($content_dir, get_stylesheet_directory()
                                            .PWHelpers::cleanPath($this->path, false));
        }

        return count($_path_) > 0 ? $content_dir.$_path_[1] : '';
    }

    private function set_script(): void
    {
        if (PWApp::isDev()) {
            $this->set_script_dev();
        } else {
            $this->set_script_prod();
        }
    }

    private function set_script_dev(): void
    {
        $asset = PWAsset::add($this->slug, 'https://localhost:'.$this->port.'/'.$this->get_relative_path_from().'main'.($this->is_ts ? '.ts' : '.js'))
            ->inFooter()->module();

        if ($this->position === 'admin') {
            $asset->toBack();
        } elseif ($this->position === 'editor') {
            $asset->toBlock();
        } else {
            $asset->toFront();
        }
    }

    /**
     * set position for asset
     */
    private function setPosition(JSAsset|CSSAsset $asset): JSAsset|CSSAsset
    {
        if ($this->position === 'admin') {
            $asset->toBack();
        } elseif ($this->position === 'editor') {
            $asset->toBlock();
        } else {
            $asset->toFront();
        }

        return $asset;
    }

    private function getPath(): string
    {
        $_path = PWHelpers::cleanPath($this->path);

        return PWApp::get_working_url($this->is_plugin).$_path.self::$dist_path;
    }

    private function set_script_prod(): void
    {
        // get manifest files list by order
        $ordered = PWManifest::getOrdered($this->path, $this->is_plugin);
        foreach ($ordered as $key => $value) {
            // if is .css in src or has css property
            if (str_contains($value->src, '.css') !== false || property_exists($value, 'css')) {
                // if has css property
                if (property_exists($value, 'css')) {
                    foreach ($value->css as $k => $f) {
                        $asset = PWAsset::add($this->slug.'-'.$k.'='.$key, $this->getPath().$f)
                            ->version($k.'='.$key);
                        $this->setPosition($asset);
                    }

                    // add preload link
                    if ($this->position === 'front') {
                        $t = '<link rel="preload" href="'.$this->getPath().$f.'" as="style" crossorigin />';
                        add_action('wp_head', function () use ($t) {
                            echo $t;
                        }, 1);
                    }

                } else {
                    $asset = PWAsset::add($this->slug.'-'.$key, $this->getPath().$value->file)
                        ->version($key);
                    $this->setPosition($asset);

                    // add preload link
                    if ($this->position === 'front') {
                        $t = '<link rel="preload" href="'.$this->getPath().$value->file.'" as="style" crossorigin />';
                        add_action('wp_head', function () use ($t) {
                            echo $t;
                        }, 1);
                    }
                }

            }

            // if is js
            if (str_contains($value->src, '.js') !== false) {

                if (str_contains($value->file, 'polyfills-legacy')) {
                    // Legacy nomodule polyfills for dynamic imports for older browsers
                    $asset = PWAsset::add($this->slug.'-'.$key, $this->getPath().$value->file)
                        ->version($key)
                        ->inFooter()->nomodule();
                    $asset = $this->setPosition($asset);
                    $asset->withInline(self::getLegacyInline(), 'before');
                } elseif (str_contains($value->file, 'legacy')) {
                    // Legacy app.js script for legacy browsers
                    $asset = PWAsset::add($this->slug.'-'.$key, $this->getPath().$value->file)
                        ->version($key)
                        ->inFooter()
                        ->nomodule();
                    $this->setPosition($asset);
                } else {
                    // Modern app.js module for modern browsers
                    $asset = PWAsset::add(
                        $this->slug.'-'.$key,
                        $this->getPath().$value->file
                    )
                        ->version($key)
                        ->inFooter()
                        ->module();
                    $this->setPosition($asset);

                    // add preload link
                    if ($this->position === 'front') {
                        $t = '<link rel="preload" href="'.$this->getPath().
                             $value->file.'" as="script" crossorigin />';
                        add_action('wp_head', function () use ($t) {
                            echo $t;
                        }, 1);
                    }
                }
            }
        }
    }
}
