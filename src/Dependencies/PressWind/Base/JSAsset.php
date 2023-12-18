<?php

declare(strict_types=1);

namespace Deaktiver\Dependencies\PressWind\Base;

class JSAsset extends Asset
{
    /**
     * move script to footer
     */
    private bool $in_footer = false;

    /**
     * attribute defer or async
     */
    private string $strategy = '';

    /**
     * attribute module
     */
    private bool $is_module = false;

    /**
     * attribute nomodule
     */
    private bool $is_nomodule = false;

    /**
     * define if asset is in footer
     *
     * @return JSAsset object
     */
    public function inFooter(): JSAsset
    {
        $this->in_footer = true;

        return $this;
    }

    /**
     * define if asset has module attribute
     *
     * @return JSAsset object
     */
    public function module(): JSAsset
    {
        $this->is_module = true;
        $this->is_nomodule = false;

        return $this;
    }

    /**
     * define if asset has nomodule attribute
     *
     * @return JSAsset object
     */
    public function noModule(): JSAsset
    {
        $this->is_nomodule = true;
        $this->is_module = false;

        return $this;
    }

    /**
     * define if script is defer
     *
     * @return JSAsset object
     */
    public function defer(): JSAsset
    {
        $this->strategy = 'defer';

        return $this;
    }

    /**
     * define if script is async
     *
     * @return JSAsset object
     */
    public function async(): JSAsset
    {
        $this->strategy = 'async';

        return $this;
    }

    /**
     * enqueue asset
     */
    protected function enqueue(): void
    {
        $arg = [
            'in_footer' => $this->in_footer,
        ];
        if ($this->strategy !== '') {
            $arg['strategy'] = $this->strategy;
        }
        $handle = $this->handle;
        $src = $this->src;
        $deps = $this->deps;
        $ver = $this->getVersion();

        wp_enqueue_script(
            $handle,
            $src,
            $deps,
            $ver,
            $arg
        );

        if ($this->is_module || $this->is_nomodule) {
            $this->addAttributes();
        }
    }

    private function addAttributes(): void
    {
        $handle = $this->handle;
        add_filter('script_loader_tag', function ($tag, $_handle) use ($handle) {

            if (! str_contains($_handle, $handle)) {
                return $tag;
            }
            $type = $this->is_module ? 'module' : 'nomodule';

            return str_replace(' src', ' type="'.$type.'" crossorigin src', $tag);
        }, 10, 3);
    }
}
