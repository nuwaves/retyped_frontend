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
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_DJANGO_BACKEND || 'http://django-app-alb-2075286004.us-east-1.elb.amazonaws.com'}/api/v1/:path*`,
      },
    ]
  },
};

export default nextConfig;
