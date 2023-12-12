<?php

declare(strict_types=1);

namespace Deaktiver\Deaktive;

use Deaktiver\Deaktive\Base\DeaktiveBase;

class DeaktiveJquery extends DeaktiveBase
{
    public function disable(): void
    {
        add_action('init', [$this, 'disable_jquery']);

    }

    public function disable_jquery(): void
    {
        if (! is_admin() && ! is_user_logged_in()) {
            wp_deregister_script('jquery');
            wp_register_script('jquery', false);
        }
    }
}
