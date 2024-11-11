/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  reactStrictMode: true,
  images: {
    domains: ["utfs.io"],
  },
};

export default nextConfig;
