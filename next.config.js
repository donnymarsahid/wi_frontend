// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "https://dev-wi.gudangsystem.com",
      },
    ],
    domains: ["i.ytimg.com", "localhost:1337"],
  },
};

module.exports = nextConfig;
