<?php

namespace Deaktiver\Dependencies\PressWind\Base;

class CSSAsset extends Asset
{
    /**
     * for css only
     */
    private string $media = 'all';

    private bool $onload = false;

    public function media(string $media): CSSAsset
    {
        $this->media = $media;

        return $this;
    }

    public function setOnLoad(): CSSAsset
    {
        $this->onload = true;
        $this->media = 'print';

        return $this;
    }

    /**
     * enqueue asset
     */
    protected function enqueue(): void
    {

        $handle = $this->handle;
        $src = $this->src;
        $deps = $this->deps;
        $ver = $this->getVersion();
        $media = $this->media;

        wp_enqueue_style(
            $handle,
            $src,
            $deps,
            $ver,
            $media
        );

        $this->addAttributes();
    }

    private function addAttributes(): void
    {
        $handle = $this->handle;
        add_filter('style_loader_tag', function ($tag, $_handle) use ($handle) {
            if (! str_contains($_handle, $handle) || ! $this->onload) {
                return $tag;
            }

            return str_replace(
                ' media=',
                ' onload="this.media=\'all\'" media=',
                $tag
            );
        }, 10, 3);
    }
}
