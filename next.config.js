/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	webpack(config, options) {
		config.resolve.extensions.push(".ts", ".tsx");
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				port: "",
			},
		],
	},
};

module.exports = nextConfig;
