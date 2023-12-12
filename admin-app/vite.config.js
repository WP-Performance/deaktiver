import { resolve } from "path";
import { defineConfig } from "vite";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
	cacheDir: "./node_modules/.vite/admin-app",
	plugins: [basicSsl()],
	base:
		process.env.APP_ENV === "development"
			? "/wp-content/plugins/deaktiver/admin-app/"
			: "/wp-content/plugins/deaktiver/admin-app/dist/",
	root: "",
	css: {
		transformer: "lightningcss",
		lightningcss: {
			targets: browserslistToTargets(browserslist(">= 0.25%")),
		},
	},
	build: {
		cssMinify: "lightningcss",
		// output dir for production build
		outDir: resolve(__dirname, "dist"),
		emptyOutDir: true,
		manifest: true,
		cssCodeSplit: false,
		// see https://esbuild.github.io/content-types/#javascript
		target: "es2018",
		rollupOptions: {
			input: resolve(__dirname, "src/main.js"),
		},
	},
	server: {
		cors: true,
		strictPort: true,
		port: 9980,
		https: true,
		hmr: {
			protocol: "wss",
			port: 9980,
		},
	},
});
