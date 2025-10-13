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
  // Force blocking metadata (no streaming) for SEO bots to ensure metadata is in <head>
  // This prevents metadata from streaming after the initial HTML for search engine crawlers
  // See: https://neuralcovenant.com/2025/06/the-metadata-streaming-controversy-in-next.js-15.1-/
  htmlLimitedBots: new RegExp([
    'Googlebot',
    'Googlebot-Image',
    'Googlebot-News',
    'Googlebot-Video',
    'Storebot-Google',
    'Google-InspectionTool',
    'GoogleOther',
    'bingbot',
    'Bingbot',
    'BingPreview',
    'msnbot',
    'Slurp',
    'DuckDuckBot',
    'Baiduspider',
    'YandexBot',
    'Sogou',
    'Exabot',
    'facebookexternalhit',
    'facebot',
    'ia_archiver',
    'Twitterbot',
    'LinkedInBot',
    'WhatsApp',
    'TelegramBot',
  ].join('|')),
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
