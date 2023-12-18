<?php

return [
    'root' => [
        'name' => '__root__',
        'pretty_version' => 'dev-main',
        'version' => 'dev-main',
        'reference' => 'fb47d2cdec1be4e0a3ed723bcf2e61468a021601',
        'type' => 'library',
        'install_path' => __DIR__.'/../../',
        'aliases' => [],
        'dev' => true,
    ],
    'versions' => [
        '__root__' => [
            'pretty_version' => 'dev-main',
            'version' => 'dev-main',
            'reference' => 'fb47d2cdec1be4e0a3ed723bcf2e61468a021601',
            'type' => 'library',
            'install_path' => __DIR__.'/../../',
            'aliases' => [],
            'dev_requirement' => false,
        ],
        'wp-performance/presswind-assets' => [
            'pretty_version' => 'dev-main',
            'version' => 'dev-main',
            'reference' => 'f3f394b7ac602fd36bb4a9ee71a84c4d977b9f77',
            'type' => 'library',
            'install_path' => __DIR__.'/../wp-performance/presswind-assets',
            'aliases' => [
                0 => '9999999-dev',
            ],
            'dev_requirement' => false,
        ],
    ],
];
