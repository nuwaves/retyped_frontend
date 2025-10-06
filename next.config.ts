import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    deviceSizes: [320, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [64, 75, 288, 302],
  },
};

export default nextConfig;
