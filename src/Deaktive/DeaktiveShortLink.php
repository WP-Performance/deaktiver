<?php

declare(strict_types=1);

namespace Deaktiver\Deaktive;

use Deaktiver\Deaktive\Base\DeaktiveBase;

class DeaktiveShortLink extends DeaktiveBase
{
    public function disable(): void
    {
        remove_action('wp_head', 'wp_shortlink_wp_head');
        remove_action('template_redirect', 'wp_shortlink_header', 11, 0);
    }
}
