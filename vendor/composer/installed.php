<?php

return [
    'root' => [
        'name' => '__root__',
        'pretty_version' => 'dev-main',
        'version' => 'dev-main',
        'reference' => '4ac51031d814f487507b28d1d5974e2b7d048a99',
        'type' => 'library',
        'install_path' => __DIR__.'/../../',
        'aliases' => [],
        'dev' => false,
    ],
    'versions' => [
        '__root__' => [
            'pretty_version' => 'dev-main',
            'version' => 'dev-main',
            'reference' => '4ac51031d814f487507b28d1d5974e2b7d048a99',
            'type' => 'library',
            'install_path' => __DIR__.'/../../',
            'aliases' => [],
            'dev_requirement' => false,
        ],
        'wp-performance/presswind-assets' => [
            'pretty_version' => 'dev-main',
            'version' => 'dev-main',
            'reference' => 'd65654ec77a047fa008cec5535e74387817ea2ef',
            'type' => 'library',
            'install_path' => __DIR__.'/../wp-performance/presswind-assets',
            'aliases' => [
                0 => '9999999-dev',
            ],
            'dev_requirement' => false,
        ],
    ],
];
