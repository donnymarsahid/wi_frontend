"use client";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "../../app/fonts";
import { STRAPI_URL } from "@/app/utils/constans";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function BannerFlooringDetail({ heroBanners }: any) {
  const banners = heroBanners[0]?.attributes?.four_card_banner || [];
  const length = banners.length;

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  // ================================================================
  // CASE 1 → 1 BANNER (FULL WIDTH)
  // ================================================================
  if (length === 1) {
    const item = banners[0];
    return (
      <div className={`${cx(poppins, poppins.className)}`}>
        <div className="w-full">
          <div
            data-aos="fade-up"
            className="relative w-full md:h-[400px] h-[150px] rounded-sm overflow-hidden shadow-card"
          >
            <img
              src={STRAPI_URL + item?.background_cover?.data?.attributes?.url}
              alt="banner"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.65)" }}
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="flex flex-col items-center text-white">
                <h1 className="font-medium md:text-3xl text-lg">
                  {item?.title}
                </h1>
                <Link
                  href={item?.linked?.redirect}
                  className="mt-2 md:text-md text-sm bg-white md:px-4 px-2 py-1 rounded text-[#6b6b6b] uppercase font-medium border border-white hover:bg-transparent hover:text-white transition"
                >
                  {item?.linked?.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================================================================
  // CASE 2 → 2 BANNER (50% - 50%)
  // ================================================================
  if (length === 2) {
    return (
      <div className={`${cx(poppins, poppins.className)}`}>
        <div className="grid grid-cols-2 gap-3">
          {banners.map((item: any, i: number) => (
            <div
              key={i}
              data-aos={i === 0 ? "fade-right" : "fade-left"}
              className="relative w-full md:h-[400px] h-[150px] rounded-sm overflow-hidden shadow-card"
            >
              <img
                src={STRAPI_URL + item?.background_cover?.data?.attributes?.url}
                alt="banner"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "brightness(0.65)" }}
              />

              <div className="absolute inset-0 flex justify-center items-center">
                <div className="flex flex-col items-center text-white text-center">
                  <h1 className="font-medium md:text-xl text-[14px]">
                    {item?.title}
                  </h1>
                  {item?.linked?.description && (
                    <p className="font-light md:text-sm text-[10px] px-1 mt-1">
                      {item?.linked?.description}
                    </p>
                  )}
                  <Link
                    href={item?.linked?.redirect}
                    className="mt-2 md:text-sm text-xs bg-white md:px-4 px-2 py-1 rounded text-[#6b6b6b] uppercase font-medium border border-white hover:bg-transparent hover:text-white transition"
                  >
                    {item?.linked?.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ================================================================
  // CASE 3 → TETAP MENGGUNAKAN CODE EXISTING (3 BANNER FIXED)
  // ================================================================
  if (length === 3) {
    const [b1, b2, b3] = banners;

    return (
      <div className={`${cx(poppins, poppins.className)}`}>
        <div className="grid grid-cols-3 grid-rows-2 md:gap-4 gap-2">
          {/* LARGE LEFT BANNER */}
          <div
            data-aos="fade-right"
            className="col-span-2 row-span-2 relative rounded-sm overflow-hidden shadow-card md:h-[400px] h-[150px]"
          >
            <img
              src={STRAPI_URL + b1?.background_cover?.data?.attributes?.url}
              alt="banner1"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.65)" }}
            />
            <div className="absolute inset-0 flex justify-center items-center text-white">
              <div className="flex flex-col items-center">
                <h1 className="font-medium md:text-3xl text-lg">{b1?.title}</h1>
                <Link
                  href={b1?.linked?.redirect}
                  className="mt-2 md:text-md text-sm bg-white md:px-4 px-2 py-1 rounded text-[#6b6b6b] uppercase border border-white hover:bg-transparent hover:text-white transition"
                >
                  {b1?.linked?.name}
                </Link>
              </div>
            </div>
          </div>

          {/* TOP RIGHT BANNER */}
          {[b2, b3].map((item, i) => (
            <div
              key={i}
              data-aos="fade-left"
              className="relative rounded-sm overflow-hidden shadow-card"
            >
              <img
                src={STRAPI_URL + item?.background_cover?.data?.attributes?.url}
                alt="banner2/3"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "brightness(0.65)" }}
              />
              <div className="absolute inset-0 flex justify-center items-center p-2 text-white text-center">
                <div className="flex flex-col items-center">
                  <h1 className="font-medium md:text-xl text-[12px]">
                    {item?.title}
                  </h1>
                  {item?.linked?.description && (
                    <p className="font-light md:text-sm text-[8px] mt-1">
                      {item?.linked?.description}
                    </p>
                  )}
                  <Link
                    href={item?.linked?.redirect}
                    className="mt-2 md:text-sm text-[8px] bg-white md:px-4 px-2 py-1 rounded text-[#6b6b6b] uppercase border border-white hover:bg-transparent hover:text-white transition"
                  >
                    {item?.linked?.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ================================================================
  // CASE 4 → 4 BANNER (2×2 GRID)
  // ================================================================
  if (length === 4) {
    return (
      <div className={`${cx(poppins, poppins.className)}`}>
        <div className="grid grid-cols-2 grid-rows-2 gap-3">
          {banners.map((item: any, i: number) => (
            <div
              key={i}
              data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
              className="relative w-full md:h-[400px] h-[150px] rounded-sm overflow-hidden shadow-card"
            >
              <img
                src={STRAPI_URL + item?.background_cover?.data?.attributes?.url}
                alt="banner"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "brightness(0.65)" }}
              />

              <div className="absolute inset-0 flex justify-center items-center">
                <div className="flex flex-col items-center text-white text-center">
                  <h1 className="font-medium md:text-xl text-[14px]">
                    {item?.title}
                  </h1>
                  {item?.linked?.description && (
                    <p className="font-light md:text-sm text-[10px] mt-1">
                      {item?.linked?.description}
                    </p>
                  )}
                  <Link
                    href={item?.linked?.redirect}
                    className="mt-2 md:text-sm text-xs bg-white md:px-4 px-2 py-1 rounded text-[#6b6b6b] uppercase border border-white hover:bg-transparent hover:text-white transition"
                  >
                    {item?.linked?.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ================================================================
  // DEFAULT (JUMLAH > 4)
  // ================================================================
  return <div className="text-center text-red-500">Max 4 banner.</div>;
}
