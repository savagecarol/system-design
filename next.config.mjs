import { legacyRedirects, seoRedirects } from './redirects.config.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@excalidraw/excalidraw', 'fuse.js'],
  async redirects() {
    return [...legacyRedirects, ...seoRedirects]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      }
    }
    return config
  },
}

export default nextConfig
