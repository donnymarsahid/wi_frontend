// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "http://localhost:1338",
      },
    ],
    domains: ["i.ytimg.com", "localhost:1337"],
  },
};

module.exports = nextConfig;
