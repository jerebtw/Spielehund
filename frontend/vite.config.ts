import path from "node:path";
import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";

const config: UserConfig = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			src: path.resolve("./src")
		}
	}
};

export default config;
