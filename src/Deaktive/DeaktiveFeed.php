<?php

declare(strict_types=1);

namespace Deaktiver\Deaktive;

use Deaktiver\Deaktive\Base\DeaktiveBase;

class DeaktiveFeed extends DeaktiveBase
{
    public function disable(): void
    {
        // feeds
        add_action('do_feed', [$this, 'disable_feed_rss'], 1);
        add_action('do_feed_rdf', [$this, 'disable_feed_rss'], 1);
        add_action('do_feed_rss', [$this, 'disable_feed_rss'], 1);
        add_action('do_feed_rss2', [$this, 'disable_feed_rss'], 1);
        add_action('do_feed_atom', [$this, 'disable_feed_rss'], 1);

        // RSS feed links
        remove_action('wp_head', 'feed_links', 2);
        // extra RSS feed links
        remove_action('wp_head', 'feed_links_extra', 3);

        // comments
        add_filter('feed_links_show_comments_feed', '__return_false');
        add_action('do_feed_rss2_comments', [$this, 'disable_feed_rss'], 1);
        add_action('do_feed_atom_comments', [$this, 'disable_feed_rss'], 1);
        add_action('template_redirect', [$this, 'disable_comment_feed'], 9);
    }

    public function disable_feeds_rss(): void
    {
        wp_redirect(site_url());
    }

    public function disable_comment_feed(): void
    {
        if (is_comment_feed()) {
            wp_die(__('Comments are disabled.', 'wpperformance-deaktiver'), '', ['response' => 403]);
        }
    }
}
