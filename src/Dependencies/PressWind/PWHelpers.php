<?php

namespace Deaktiver\Dependencies\PressWind;

class PWHelpers
{
    public static function cleanPath($path)
    {
        // add slash start if not exist
        $_path = str_starts_with($path, '/') ? $path : '/'.$path;

        // add slash end if not exist
        return str_ends_with($_path, '/') ? $_path : $_path.'/';
    }
}
