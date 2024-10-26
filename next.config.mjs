// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://dev.wallpaperindonesia.com",
      },
    ],
    domains: ["i.ytimg.com", "dev.wallpaperindonesia.com"],
  },
};

module.exports = nextConfig;
