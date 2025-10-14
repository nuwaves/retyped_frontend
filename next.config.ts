import type { NextConfig } from "next";
import { DJANGO_BACKEND } from '@/app/_config/env';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  output: "standalone",

  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimize package imports for better tree-shaking
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      '@fortawesome/react-fontawesome',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-brands-svg-icons',
    ],
    // Inline CSS to eliminate render-blocking resources
    inlineCss: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    deviceSizes: [320, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [64, 75, 288, 302],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/sitemap.xml',
          destination: `${DJANGO_BACKEND}/sitemap.xml`,
        },
        {
          source: '/sitemap-episodes:id.xml',
          destination: `${DJANGO_BACKEND}/sitemap-episodes:id.xml`,
        },
        {
          source: '/sitemap-podcasts:id.xml',
          destination: `${DJANGO_BACKEND}/sitemap-podcasts:id.xml`,
        }
      ]
    }
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/auth',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/auth',
        permanent: true,
      },
    ]
  }
};

export default withBundleAnalyzer(nextConfig);
