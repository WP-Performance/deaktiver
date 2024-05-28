<?php

declare(strict_types=1);

/**
 * api for ajax request from app admin
 */

namespace Deaktiver\Options;

class OptionsServices
{
    public static $use_config_file = false;

    public function __construct()
    {
        add_action('wp_ajax_save_dkr_config', function () {
            $this->saveAction('config');
        });

    }

    public static function use_config_file($key)
    {
        $files_path = get_stylesheet_directory() . '/config/deaktiver.php';
        if (file_exists($files_path)) {
            return include $files_path;
        }
    }

    public static function get_options(): array
    {
        if (file_exists(__DIR__ . '/../../config/options.php')) {
            return include __DIR__ . '/../../config/options.php';
        }

        return [];
    }

    /**
     * get value from db
     */
    public static function get($key, $cached = true): ?array
    {
        // if config file exist in theme
        $config = self::use_config_file($key);
        if ($config) {
            self::$use_config_file = true;

            return $config;
        }

        // transient cache
        $transient = get_transient(WPPERFORMANCE_DEAKTIVER . '_' . $key);
        if ($transient && $cached) {
            return $transient;
        }

        $data = get_option(WPPERFORMANCE_DEAKTIVER . '_' . $key);
        if (! $data) {
            return null;
        }

        // set transient cache
        set_transient(WPPERFORMANCE_DEAKTIVER . '_' . $key, $data, 60 * 60 * 24);

        return $data;
    }

    /**
     * save value in db
     *
     * @param  string  $key
     * @param  array  $value
     */
    public static function set($key, $value): void
    {
        if ($value) {
            $config = self::get_options();
            if (! $config) {
                return;
            }
            $data = [];
            foreach ($config as $k => $v) {
                if (array_key_exists($k, $value)) {
                    $data[$k] = filter_var(sanitize_text_field($value[$k]), FILTER_VALIDATE_BOOL);
                }
            }
            update_option(WPPERFORMANCE_DEAKTIVER . '_' . $key, $data);
            delete_transient(WPPERFORMANCE_DEAKTIVER . '_' . $key);
        }
    }

    /**
     * get values
     *
     * @param  string  $key
     * @return array (json)
     */
    public function getAction($key): string
    {
        if (! $key) {
            return '';
        }
        // return value
        $res = self::get($key, false);

        return wp_send_json_success($res ? $res : null);
    }

    /**
     * save values
     *
     * @param  string  $key
     */
    public function saveAction($key): string
    {
        if (! $key) {
            return '';
        }

        // update value
        self::set($key, $_POST);

        // return new value
        $res = self::get($key, false);

        return wp_send_json_success($res ? $res : null);
    }
}
