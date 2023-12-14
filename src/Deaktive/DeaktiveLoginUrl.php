<?php

declare(strict_types=1);

namespace Deaktiver\Deaktive;

use Deaktiver\Deaktive\Base\DeaktiveBase;

class DeaktiveLoginUrl extends DeaktiveBase
{
    public function disable(): void
    {
        // Update login page image link URL.
        add_filter('login_headerurl', function () {
            return home_url();
        });

        // Update login page link title.
        add_filter('login_headertext', function () {
            return get_bloginfo('name');
        });
    }
}
