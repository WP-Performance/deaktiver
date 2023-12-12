<?php

declare(strict_types=1);

namespace Deaktiver\Deaktive;

use Deaktiver\Deaktive\Base\DeaktiveBase;

class DeaktiveXmlrpc extends DeaktiveBase
{
    public function disable(): void
    {
        // XML RPC security
        add_filter('xmlrpc_enabled', '__return_false');
        add_filter('xmlrpc_methods', '__return_false');
        // really simple discovery link
        remove_action('wp_head', 'rsd_link');

        add_filter('pings_open', '__return_false', 9999);
        add_filter('pre_update_option_enable_xmlrpc', '__return_false');
        add_filter('pre_option_enable_xmlrpc', '__return_zero');
        add_filter('wp_headers', [$this, 'remove_pingback']);

        add_action('init', [$this, 'kill_xmlrpc']);
    }

    public function kill_xmlrpc(): void
    {
        if (! isset($_SERVER['SCRIPT_FILENAME'])) {
            return;
        }

        // direct requests only
        if (basename($_SERVER['SCRIPT_FILENAME']) !== 'xmlrpc.php') {
            return;
        }

        $header = 'HTTP/1.1 403 Forbidden';
        header($header);
        echo $header;
        exit();
    }

    public function remove_pingback($headers)
    {
        unset($headers['X-Pingback']);

        return $headers;

    }
}
