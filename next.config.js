// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "http://127.0.0.1:1338",
      },
    ],
    domains: ["i.ytimg.com", "localhost:1337"],
  },
};

module.exports = nextConfig;
