<?php

declare(strict_types=1);

namespace Deaktiver\Deaktive;

use Deaktiver\Deaktive\Base\DeaktiveBase;

class DeaktivePoweredBy extends DeaktiveBase
{
    public function disable(): void
    {
        // Remove X-Powered-By
        add_action('wp', function () {
            if (function_exists('header_remove')) {
                header_remove('x-powered-by');
            }
        });
    }
}
