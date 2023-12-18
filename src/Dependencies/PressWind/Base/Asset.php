<?php

declare(strict_types=1);

namespace Deaktiver\Dependencies\PressWind\Base;

class Asset
{
    /**
     * handle of file
     */
    protected string $handle;

    /**
     * path to file
     */
    protected string $src;

    /**
     * dependencies of file
     */
    protected array $deps = [];

    /**
     * version of file
     */
    protected string $ver;

    /**
     * @throws \Exception
     */
    public function __construct($handle, $src = '')
    {
        if (! is_string($handle)) {
            throw new \Exception('handle must be a string');
        }

        $this->handle = $handle;
        $this->src = $src;
    }

    /**
     * define dependencies for asset
     *
     *
     * @return Asset object
     */
    public function dependencies(array $deps): Asset
    {
        $this->deps = $deps;

        return $this;
    }

    /**
     * define version for asset
     * if not defined, get filemtime
     *
     *
     * @return Asset object
     */
    public function version(string $ver): Asset
    {
        $this->ver = $ver;

        return $this;
    }

    /**
     * attach inline script to script
     */
    public function withInline(string $script, string $position = 'after'): void
    {
        add_action('wp_enqueue_scripts', function () use ($script, $position) {
            wp_add_inline_script($this->handle, $script, $position);
        });
    }

    /**
     * enqueue asset in front
     */
    public function toFront(): Asset
    {
        $enqueue = function () {
            $this->enqueue();
        };
        add_action('wp_enqueue_scripts', $enqueue);

        return $this;
    }

    /**
     * enqueue asset in back
     */
    public function toBack(): void
    {
        $enqueue = function () {
            $this->enqueue();
        };
        add_action('admin_enqueue_scripts', $enqueue);
    }

    /**
     * enqueue asset in block editor
     */
    public function toBlock(): void
    {
        $enqueue = function () {
            $this->enqueue();
        };
        add_action('enqueue_block_editor_assets', $enqueue);
    }

    /**
     * enqueue asset in login
     */
    public function toLogin(): void
    {
        $enqueue = function () {
            $this->enqueue();
        };
        add_action('login_enqueue_scripts', $enqueue);
    }

    /**
     * get version of file
     */
    protected function getVersion(): string
    {
        $dir = get_stylesheet_directory();
        // determine path to file in server
        $path = str_replace(get_stylesheet_directory_uri(), '', $this->src);
        // get file path
        $file = $dir.$path;
        // if is dev localhost return time
        if (str_contains($file, 'localhost')) {
            return strval(strtotime('now'));
        }

        return $this->ver ?? strval(filemtime($file));
    }

    protected function enqueue(): void
    {
    }
}
