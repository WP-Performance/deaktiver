<?php

declare(strict_types=1);

namespace Deaktiver\Dependencies\PressWind;

class PWHelpers
{
    public static function cleanPath($path, $end = true): string
    {
        // add slash start if not exist
        $_path = str_starts_with($path, '/') ? $path : '/'.$path;
        // remove slash end if exist
        if (! $end) {
            return str_ends_with($_path, '/') ? substr($_path, 0, -1) : $_path;
        }

        // add slash end if not exist
        return str_ends_with($_path, '/') ? $_path : $_path.'/';
    }
}
