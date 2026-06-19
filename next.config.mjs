/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [25, 50, 75, 90, 100],
    remotePatterns: [
      {
        // Vercel Blob CDN — serves uploaded gallery images
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
