<?php

declare(strict_types=1);

namespace Deaktiver\Deaktive;

use Deaktiver\Options\OptionsServices;

class Deaktiver
{
    /**
     * all deaktiver activated
     */
    public static $deaktiver = [];

    /**
     * get class name from key
     */
    public static function get_class_name($key)
    {
        // ucfirst and camelCase from - or _
        $key = str_replace(['-', '_'], ' ', $key);
        $key = str_replace(' ', '', ucwords($key));

        return 'Deaktiver\Deaktive\Deaktive'.ucfirst($key);
    }

    /**
     * init all deaktiver activated
     */
    public static function init(): void
    {
        $config = OptionsServices::class::get('config');
        if (! $config) {
            return;
        }

        foreach ($config as $key => $value) {

            if ($value === true) {
                $class_name = self::get_class_name($key);
                if (! class_exists($class_name)) {
                    continue;
                }
                self::$deaktiver[] = new $class_name();
            }
        }
        self::disable();
    }

    /**
     * disable all deaktiver activated
     */
    public static function disable(): void
    {
        foreach (self::$deaktiver as $deaktive) {
            $deaktive->disable();
        }
    }
}
