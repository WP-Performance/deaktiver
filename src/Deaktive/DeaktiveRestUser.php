<?php

declare(strict_types=1);

namespace Deaktiver\Deaktive;

use Deaktiver\Deaktive\Base\DeaktiveBase;

class DeaktiveRestUser extends DeaktiveBase
{
    public function disable(): void
    {
        add_filter('rest_endpoints', [$this, 'disable_rest_user']);

    }

    public function disable_rest_user(array $endpoints): array
    {
        if (! is_user_logged_in()) {
            if (isset($endpoints['/wp/v2/users'])) {
                unset($endpoints['/wp/v2/users']);
            }

            if (isset($endpoints['/wp/v2/users/(?P<id>[\d]+)'])) {
                unset($endpoints['/wp/v2/users/(?P<id>[\d]+)']);
            }
        }

        return $endpoints;
    }
}
