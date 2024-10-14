/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add fallback configurations
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you have existing fallbacks, spread them here
      fs: false,
      net: false,
      tls: false,
    };

    // Add parent directory to module resolution path
    config.resolve.modules.push(path.resolve("./.."));

    return config;
  },
};

module.exports = nextConfig;
