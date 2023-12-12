<?php

declare(strict_types=1);

namespace Deaktiver\Deaktive;

use Deaktiver\Deaktive\Base\DeaktiveBase;

class DeaktiveRsdLink extends DeaktiveBase
{
    public function disable(): void
    {
        remove_action('wp_head', 'rsd_link');
    }
}
