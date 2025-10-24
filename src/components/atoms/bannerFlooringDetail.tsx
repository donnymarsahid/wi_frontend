import Image from "next/image";

import cx from "classnames";
import { poppins } from "../../app/fonts";
import { STRAPI_URL } from "@/app/utils/constans";
import Link from "next/link";

export default function BannerFlooringDetail({ heroBanners }: any) {
  const dataAdjustment_1 = heroBanners[0]?.attributes?.three_card_banner[0];
  const dataAdjustment_2 = heroBanners[0]?.attributes?.three_card_banner[1];
  const dataAdjustment_3 = heroBanners[0]?.attributes?.three_card_banner[2];
  return (
    <div className={`${cx(poppins, poppins.className)}`}>
      <div className="grid grid-cols-3 grid-rows-2 md:gap-4 gap-2">
        {/* div1: span 2 kolom dan 2 baris */}
        <div className="bg-[#D9D9D9] col-span-2 row-span-2 flex items-center justify-center text-white font-bold">
          <div className="relative w-full h-[400px] rounded-sm overflow-hidden shadow-card">
            <img
              src={
                STRAPI_URL +
                dataAdjustment_1?.background_cover?.data?.attributes?.url
              }
              alt="image-wi"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.65)" }}
            />
            <div className="absolute top-0 right-0 left-0 bottom-0">
              <div className="flex justify-center items-center w-full h-full">
                <div className="flex justify-center flex-col items-center">
                  <h1 className="font-medium md:text-3xl text-lg">
                    {dataAdjustment_1?.title}
                  </h1>
                  <Link
                    href={dataAdjustment_1?.linked?.redirect}
                    className="mt-2 md:text-md text-sm bg-white md:px-4 px-2 py-1 rounded text-[#6b6b6b] uppercase font-medium border border-1 border-white hover:bg-transparent hover:text-white transition duration-300 ease-in-out"
                  >
                    {dataAdjustment_1?.linked?.name}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* div2: kolom ke-3, baris ke-1 */}
        <div className="bg-[#D9D9D9] col-start-3 row-start-1 flex items-center justify-center text-white font-bold">
          <div className="relative w-full h-full rounded-sm overflow-hidden shadow-card">
            <img
              src={
                STRAPI_URL +
                dataAdjustment_2?.background_cover?.data?.attributes?.url
              }
              alt="image-wi"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.65)" }}
            />
            <div className="absolute top-0 right-0 left-0 bottom-0 p-2">
              <div className="flex justify-center items-center w-full h-full">
                <div className="flex justify-center flex-col items-center">
                  <h1 className="font-medium md:text-xl text-sm text-center">
                    {dataAdjustment_2?.title}
                  </h1>
                  <p className="font-light text-center md:text-sm text-[8px]">
                    {dataAdjustment_2?.linked?.description}
                  </p>
                  <Link
                    href={dataAdjustment_2?.linked?.redirect}
                    className="mt-2 md:text-sm text-[9px] bg-white md:px-4 px-2 py-1 rounded text-[#6b6b6b] uppercase font-medium border border-1 border-white hover:bg-transparent hover:text-white transition duration-300 ease-in-out"
                  >
                    {dataAdjustment_2?.linked?.name}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* div3: kolom ke-3, baris ke-2 */}
        <div className="bg-[#D9D9D9] col-start-3 row-start-2 flex items-center justify-center text-white font-bold">
          <div className="relative w-full h-full rounded-sm overflow-hidden shadow-card">
            <img
              src={
                STRAPI_URL +
                dataAdjustment_3?.background_cover?.data?.attributes?.url
              }
              alt="image-wi"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.65)" }}
            />
            <div className="absolute top-0 right-0 left-0 bottom-0 p-2">
              <div className="flex justify-center items-center w-full h-full">
                <div className="flex justify-center flex-col items-center">
                  <h1 className="font-medium md:text-xl text-sm text-center">
                    {dataAdjustment_3?.title}
                  </h1>
                  <p className="font-light text-center md:text-sm text-[8px]">
                    {" "}
                    {dataAdjustment_3?.linked?.description}
                  </p>
                  <Link
                    href={dataAdjustment_3?.linked?.redirect}
                    className="mt-2 md:text-sm text-[9px] bg-white md:px-4 px-2 py-1 rounded text-[#6b6b6b] uppercase font-medium border border-1 border-white hover:bg-transparent hover:text-white transition duration-300 ease-in-out"
                  >
                    {dataAdjustment_3?.linked?.name}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
