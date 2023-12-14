<?php

declare(strict_types=1);

namespace Deaktiver\Deaktive;

use Deaktiver\Deaktive\Base\DeaktiveBase;

class DeaktiveLoginLangSelector extends DeaktiveBase
{
    public function disable(): void
    {
        add_filter('login_display_language_dropdown', '__return_false');
    }
}
