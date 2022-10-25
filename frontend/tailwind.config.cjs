const config = {
	mode: "jit",
	content: ["./src/**/*.{html,js,svelte,ts}"],

	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#5b21b6",
					secondary: "#8b5cf6",
					accent: "#2dd4bf",
					neutral: "#191D24",
					"base-100": "#2A303C",
					info: "#06b6d4",
					success: "#84cc16",
					warning: "#f59e0b",
					error: "#dc2626"
				}
			}
		]
	},

	plugins: [require("daisyui")]
};

module.exports = config;
