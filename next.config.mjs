const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["panel.wallpaperindonesia.com", "i.ytimg.com"], // Anda tidak perlu menduplikasi protokol
    formats: ["image/avif", "image/webp"], // Mengatur format gambar yang optimal
  },
};

module.exports = nextConfig;
