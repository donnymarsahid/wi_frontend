import cx from "classnames";
import { poppins } from "./fonts";

const NotFound = () => {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center py-6 ${cx(
        poppins,
        poppins.className
      )}`}
    >
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-semibold">Halaman Tidak Tersedia</h1>
        <p className="text-gray-600">
          Maaf, halaman yang Anda cari tidak ditemukan.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
