/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        swcPlugins: [['harmony-ai-plugin', {rootDir: new URL(".", import.meta.url).pathname}]]
    }
};

export default nextConfig;
