/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    runtime: process.env.RUNTIME
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**'
      }
    ]
  }
};

export default nextConfig;
