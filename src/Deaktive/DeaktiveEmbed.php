<?php

declare(strict_types=1);

namespace Deaktiver\Deaktive;

use Deaktiver\Deaktive\Base\DeaktiveBase;

class DeaktiveEmbed extends DeaktiveBase
{
    public function disable(): void
    {
        add_action('init', [$this, 'disable_embed'], 9999);
    }

    public function disable_embed(): void
    {
        global $wp;
        $wp->public_query_vars = array_diff($wp->public_query_vars, ['embed']);
        add_filter('embed_oembed_discover', '__return_false');
        remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);
        remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);
        remove_action('wp_head', 'wp_oembed_add_host_js');
        remove_filter('pre_oembed_result', 'wp_filter_pre_oembed_result', 10);
        add_filter('tiny_mce_plugins', [$this, 'tiny_mce_plugins']);
        add_filter('rewrite_rules_array', [$this, 'rewrite_rules_array']);
    }

    public function tiny_mce_plugins($plugins): array
    {
        return array_diff($plugins, ['wpembed']);
    }

    public function rewrite_rules_array($rules): array
    {
        foreach ($rules as $rule => $rewrite) {
            if (is_string($rewrite) && str_contains($rewrite, 'embed=true')) {
                unset($rules[$rule]);
            }
        }

        return $rules;
    }
}
