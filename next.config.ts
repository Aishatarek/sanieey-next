import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*',  // Catch all routes (e.g., /recommend, /about)
        destination: '/pages/:path*',  // Rewrite to /pages/recommend, etc.
      },
    ];
  },
};