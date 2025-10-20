import Image from "next/image";

export const metadata = {
  title: "Halaman Tidak Ditemukan",
  description: "Oops! Halaman yang kamu cari tidak ditemukan.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Custom404Page() {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center py-6`}
    >
      <div className="text-center">
        <Image
          src={"/assets/images/404_page-not-found-1024x576.jpg"}
          width={500}
          height={500}
          alt="404"
        />
      </div>
    </div>
  );
}
