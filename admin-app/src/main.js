import "./main.css";
import Alpine from "alpinejs";

import { initSwitch } from "./assets/js/switch.ts";
import { fetchAPI } from "./assets/js/queries.ts";

window.Alpine = Alpine;

Alpine.data("options", () => ({
	loading: false,
	btn: null,
	disabled: false,
	success: false,
	error: false,
	elems: [],
	init() {
		this.btn = this.$el.querySelector("button");
		this.elems = this.$el.querySelectorAll("input[type='checkbox']");
		if (this.$el.classList.contains("dkr_disabled")) {
			this.btn.disabled = true;
			this.disabled = true;
			for (const el of this.elems) {
				el.disabled = true;
			}
		}
	},
	async sendForm(event) {
		if (this.disabled) return;
		this.btn.disabled = true;
		this.loading = true;
		event.preventDefault();
		const data = {};
		for (const el of this.elems) {
			const name = el.name;
			const value = el.checked;
			if (name) {
				data[name] = value;
			}
		}
		const action = this.$el.elements.action.value;
		const ajaxUrl = this.$el.getAttribute("action");
		const res = await fetchAPI({ data, action, ajaxUrl });
		if (res?.success === true) {
			this.success = true;
			setTimeout(() => {
				this.success = false;
			}, 2000);
		} else {
			this.error = true;
			setTimeout(() => {
				this.error = false;
			}, 2000);
		}
		this.loading = false;
		this.btn.disabled = false;
	},
}));

document.addEventListener("DOMContentLoaded", () => {
	const container = document.getElementById("gm-admin-app");

	if (container) {
		initSwitch();
	}
});

Alpine.start();
