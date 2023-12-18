<?php

return [
    'root' => [
        'name' => '__root__',
        'pretty_version' => 'dev-main',
        'version' => 'dev-main',
        'reference' => 'e16292994f6b1ee29b3dbaeacd2be08e5f466b65',
        'type' => 'library',
        'install_path' => __DIR__.'/../../',
        'aliases' => [],
        'dev' => true,
    ],
    'versions' => [
        '__root__' => [
            'pretty_version' => 'dev-main',
            'version' => 'dev-main',
            'reference' => 'e16292994f6b1ee29b3dbaeacd2be08e5f466b65',
            'type' => 'library',
            'install_path' => __DIR__.'/../../',
            'aliases' => [],
            'dev_requirement' => false,
        ],
        'wp-performance/presswind-assets' => [
            'pretty_version' => 'dev-main',
            'version' => 'dev-main',
            'reference' => '5bbd5e224d1573f8342904c910cbcc1a964d4bbc',
            'type' => 'library',
            'install_path' => __DIR__.'/../wp-performance/presswind-assets',
            'aliases' => [
                0 => '9999999-dev',
            ],
            'dev_requirement' => false,
        ],
    ],
];
