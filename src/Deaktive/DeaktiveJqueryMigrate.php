<?php

declare(strict_types=1);

namespace Deaktiver\Deaktive;

use Deaktiver\Deaktive\Base\DeaktiveBase;

class DeaktiveJqueryMigrate extends DeaktiveBase
{
    public function disable(): void
    {
        add_filter('wp_default_scripts', function ($scripts) {
            if (! is_admin() && isset($scripts->registered['jquery'])) {
                $script = $scripts->registered['jquery'];

                if ($script->deps) {
                    $script->deps = array_diff($script->deps, ['jquery-migrate']);
                }
            }
        });
    }
}
