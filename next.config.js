const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["panel.wallpaperindonesia.co.id", "i.ytimg.com"], // Anda tidak perlu menduplikasi protokol
    formats: ["image/avif", "image/webp"], // Mengatur format gambar yang optimal
  },
};

module.exports = nextConfig;
