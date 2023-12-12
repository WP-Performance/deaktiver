<?php

namespace Deaktiver\Dependencies\PressWind;

class PWApp
{
    public static function get_working_path($is_plugin): string
    {
        return $is_plugin ?
            plugin_dir_path(__DIR__).'../../' : get_stylesheet_directory();
    }

    public static function get_working_url($is_plugin): string
    {
        return $is_plugin ? plugin_dir_url(__DIR__).'../../' : get_stylesheet_directory_uri();
    }

    public static function isDev(): bool
    {
        return defined('WP_ENV') && WP_ENV === 'development';
    }
}
