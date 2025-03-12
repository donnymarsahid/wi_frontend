const nextConfig = {
  reactStrictMode: false,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  images: {
    domains: [
      "panel.wallpaperindonesia.com",
      "i.ytimg.com",
      "qa.wallpaperindonesia.com",
      "wallpaperindonesia.com",
    ], // Anda tidak perlu menduplikasi protokol
    formats: ["image/avif", "image/webp"], // Mengatur format gambar yang optimal
  },
};

module.exports = nextConfig;
