/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [25, 50, 75, 90, 100],
    remotePatterns: [
      {
        // Vercel Public Blob CDN
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
      {
        // Vercel Private Blob CDN
        protocol: "https",
        hostname: "**.private.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
