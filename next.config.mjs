/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [
      [
        'harmony-ai-plugin',
        {
          rootDir: new URL('.', import.meta.url).pathname,
          repositoryId: '7adebdf4-def2-479a-ab5e-c855bebe2d2c',
        },
      ],
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
      },
      {
        protocol: 'https',
        hostname: 'necgqvap1g3t014x.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
