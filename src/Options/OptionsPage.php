<?php

declare(strict_types=1);

namespace Deaktiver\Options;

class OptionsPage
{
    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_options_page']);
    }

    /**
     * register options page
     */
    public function register_options_page(): void
    {
        add_options_page(__('Deaktiver'), __('Deaktiver'),
            'activate_plugins', WPPERFORMANCE_DEAKTIVER, [$this, 'inject_html']);
    }

    /**
     * inject html into options page
     */
    public function inject_html(): void
    {
        $config = OptionsServices::get('config', false) ?? [];

        $html = '<div id="gm-admin-app" style="padding-right: 20px;">
				<h1><img src="' . WPPERFORMANCE_DEAKTIVER_URI . '/admin-app/src/assets/media/deaktiver.png" />' . ucfirst(WPPERFORMANCE_DEAKTIVER) . '</h1>';
        $html .= '<p>' . __('Deaktiver is a plugin that allows you to disable unnecessary features of WordPress.', 'wpperformance-deaktiver') . '</p>';
        if (OptionsServices::$use_config_file === true) {
            $html .= '<p class="dkr_message_info">' . __('The form is disabled because you use config file in your theme. You can edit the configuration file in your theme to add or remove features.', 'wpperformance-deaktiver') . '</p>';
        }
        $html .= '<form x-data="options" x-on:submit="sendForm" class="dkr_options ' . (OptionsServices::$use_config_file === true ? 'dkr_disabled' : '') . '" method="post" action="'
                 . admin_url('admin-ajax.php') . '">';
        $html .= '<input type="hidden" name="action" value="save_dkr_config"><fieldset>';
        foreach (OptionsServices::get_options() as $key => $option) {

            $html .= $this->get_switch_element($key, $option,
                array_key_exists($key, $config) && $config[$key] === true);
        }

        $html .= '</fieldset><button type="submit" class="button
	    button-primary dkr_button_send"><span x-show="!loading">' . __('Save settings', 'wpperformance-deaktiver') . '
	    </span><span x-show="loading" class="dkr_loader"></span></button>';
        $html .= '<div class="dkr_message">
			<div x-show="success" class="dkr_message_success">' . __('Saved successfully', 'wpperformance-deaktiver') . '</div>
			<div x-show="error" class="dkr_message_error">' . __('Error on save process', 'wpperformance-deaktiver') . '</div>
		</div>';
        $html .= '</form>';
        $html .= '</div>';

        echo $html;
    }

    /**
     * construct switch element form
     */
    public function get_switch_element($name, $value, $checked = false): string
    {
        // https://www.w3.org/WAI/ARIA/apg/patterns/switch/examples/switch-checkbox/
        return '<div class="dkr_option">
			<label class="dkr_switch">
		    <span class="label">' . $value['label'] . '</span>
		    <p>' . $value['description'] . '</p>
		    <input name="' . $name . '"  id="' . $name . '" ' . ($checked ? ' checked="checked" ' :
                '') . '
		        type="checkbox" role="switch">
		    <span class="state">
		      <span class="container">
		        <span class="position"> </span>
		      </span>
		      <span class="on" aria-hidden="true">' . __('Disabled', 'wpperformance-deaktiver') . '</span>
		      <span class="off" aria-hidden="true">' . __('Default', 'wpperformance-deaktiver') . '</span>
		    </span>
		  </label>
		  </div>';
    }
}
