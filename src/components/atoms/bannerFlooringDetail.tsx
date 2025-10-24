import Image from "next/image";

import cx from "classnames";
import { poppins } from "../../app/fonts";

export default function BannerFlooringDetail() {
  return (
    <div className={`${cx(poppins, poppins.className)}`}>
      <div className="grid grid-cols-3 grid-rows-2 md:gap-4 gap-2">
        {/* div1: span 2 kolom dan 2 baris */}
        <div className="bg-red-400 col-span-2 row-span-2 flex items-center justify-center text-white font-bold">
          <div className="relative w-full h-[400px] rounded-sm overflow-hidden shadow-card">
            <img
              src={
                "https://karpetcustom.com/wp-content/uploads/2021/06/foto-karpet-hotel-bioskop-ballroom-custom-axminster-printing-masjid-handtufted-handmade.jpg"
              }
              alt="image-wi"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.65)" }}
            />
            <div className="absolute top-0 right-0 left-0 bottom-0">
              <div className="flex justify-center items-center w-full h-full">
                <div className="flex justify-center flex-col items-center">
                  <h1 className="font-medium md:text-3xl text-lg">
                    KARPET HOTEL
                  </h1>
                  <button className="mt-2 md:text-md text-sm bg-white md:px-4 px-2 py-1 rounded text-[#6b6b6b] uppercase font-medium border border-1 border-white hover:bg-transparent hover:text-white transition duration-300 ease-in-out">
                    Cek Produknya
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* div2: kolom ke-3, baris ke-1 */}
        <div className="bg-blue-400 col-start-3 row-start-1 flex items-center justify-center text-white font-bold">
          <div className="relative w-full h-full rounded-sm overflow-hidden shadow-card">
            <img
              src={
                "https://karpetcustom.com/wp-content/uploads/2021/06/foto-karpet-hotel-bioskop-ballroom-custom-axminster-printing-masjid-handtufted-handmade.jpg"
              }
              alt="image-wi"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.65)" }}
            />
            <div className="absolute top-0 right-0 left-0 bottom-0 p-2">
              <div className="flex justify-center items-center w-full h-full">
                <div className="flex justify-center flex-col items-center">
                  <h1 className="font-medium md:text-xl text-sm text-center">
                    KARPET SALE!
                  </h1>
                  <p className="font-light text-center md:text-sm text-[8px]">
                    Dapatkan potongan harga dari koleksi karpet Sale. Cek
                    Sekarang!
                  </p>
                  <button className="mt-2 md:text-md text-[9px] bg-white md:px-4 px-2 py-1 rounded text-[#6b6b6b] uppercase font-medium border border-1 border-white hover:bg-transparent hover:text-white transition duration-300 ease-in-out">
                    Cek Promonya
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* div3: kolom ke-3, baris ke-2 */}
        <div className="bg-green-400 col-start-3 row-start-2 flex items-center justify-center text-white font-bold">
          <div className="relative w-full h-full rounded-sm overflow-hidden shadow-card">
            <img
              src={
                "https://karpetcustom.com/wp-content/uploads/2021/06/foto-karpet-hotel-bioskop-ballroom-custom-axminster-printing-masjid-handtufted-handmade.jpg"
              }
              alt="image-wi"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.65)" }}
            />
            <div className="absolute top-0 right-0 left-0 bottom-0 p-2">
              <div className="flex justify-center items-center w-full h-full">
                <div className="flex justify-center flex-col items-center">
                  <h1 className="font-medium md:text-xl text-sm text-center">
                    KARPET RESIDENTIAL
                  </h1>
                  <p className="font-light text-center md:text-sm text-[8px]"></p>
                  <button className="mt-2 md:text-md text-[9px] bg-white md:px-4 px-2 py-1 rounded text-[#6b6b6b] uppercase font-medium border border-1 border-white hover:bg-transparent hover:text-white transition duration-300 ease-in-out">
                    Cek Promonya
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
