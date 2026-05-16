import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		cloudflare({
			viteEnvironment: { name: "ssr" },
		}),
		tailwindcss(),
		reactRouter(),
	],
	resolve: {
		tsconfigPaths: true,
	},
	server: {
		open: true,
	},
	build: {
		minify: true,
	},
	optimizeDeps: {
		exclude: [
			"cloudflare:email",
			"cloudflare:sockets",
			"cloudflare:workers",
			"cloudflare:workflows",
		],
	},
});
