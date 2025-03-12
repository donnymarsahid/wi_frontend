const nextConfig = {
  reactStrictMode: false,
  images: {
    loader: "imgix",
    path: "/",
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
