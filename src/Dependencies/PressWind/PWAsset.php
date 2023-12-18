<?php

declare(strict_types=1);

namespace Deaktiver\Dependencies\PressWind;

use Deaktiver\Dependencies\PressWind\Base\CSSAsset;
use Deaktiver\Dependencies\PressWind\Base\JSAsset;

/**
 * Class PwAsset
 */
class PWAsset
{
    /**
     * Create new asset instance
     *
     * @throws \Exception
     */
    public static function add($handle, $src): CSSAsset|JSAsset
    {
        try {
            if (self::is_css($src)) {
                return new CSSAsset($handle, $src);
            } else {
                return new JSAsset($handle, $src);
            }
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    /**
     * define if asset is css
     */
    protected static function is_css($src): bool
    {
        // extension is .css
        $path = pathinfo($src);

        return $path['extension'] === 'css';
    }
}
