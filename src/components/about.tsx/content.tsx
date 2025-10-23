"use client";
import React, { ChangeEvent, useState } from "react";
import { AboutProps } from "@/types/about";
import CarouselBanner from "../atoms/carouselbannerabout";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import Clients from "../home/clients";
import { ClientProps } from "@/types/client";
import Image from "next/image";
import { STRAPI_URL } from "@/app/utils/constans";
import CarouselBannerPortfolio from "../atoms/carouselbannerportfolio";
import { FooterProps } from "@/types/footer";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { ReviewsProps } from "@/types/reviews";
import GalleryModal from "../atoms/GalleryModal";

type AboutDetailProps = {
  data: AboutProps;
  clients: ClientProps;
  footer: FooterProps;
  reviews: ReviewsProps;
};

export default function Content({
  data,
  clients,
  footer,
  reviews,
}: AboutDetailProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  function getImg(idx: number) {
    return data?.data?.attributes?.portfolios?.data?.[idx] ?? null;
  }
  return (
    <div>
      <div
        className={`container mx-auto mt-[120px] md:mt-[150px] lg:mt-[0px] ${cx(
          poppins,
          poppins.className
        )}`}
      >
        <div className="md:mx-10 mx-4">
          <div>
            <CarouselBanner about={data} />
          </div>
          <div className={`flex justify-center my-16 items-center flex-col`}>
            <div className="flex items-center flex-col">
              <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
                Experience Excellence
              </h1>
              <p className="text-justify">{data.data.attributes.about}</p>
            </div>
          </div>
          <div className="my-16">
            {/* <div className={`flex justify-center`}>
              <div className="flex items-center flex-col">
                <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
                  Portfolio
                </h1>
              </div>
            </div> */}
            <div className="flex justify-center">
              <div className="max-w-6xl w-full">
                {/* Grid 2 kolom */}
                <div className="flex justify-between">
                  {/* ========== KoLom KIRI ========= */}
                  <div className="w-full md:me-4 me-2">
                    {/* Gambar besar (menggantikan baris 1 & 2) */}
                    {getImg(0) && (
                      <div
                        onClick={() => handleOpen(0)}
                        className="relative cursor-pointer overflow-hidden  shadow-md md:h-[520px] h-[316px]"
                      >
                        <img
                          src={STRAPI_URL + getImg(0).attributes.url}
                          alt={getImg(0).attributes.name || `img-0`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold">
                          Klik untuk lihat
                        </div>
                      </div>
                    )}

                    {/* Baris 3 di kolom kiri: 2 gambar kecil berdampingan */}
                    <div className="grid grid-cols-2 md:gap-4 gap-2 md:mt-4 mt-2">
                      {/*
            gunakan index 3 dan 4 untuk dua foto kecil (jika tidak ada, kosongkan)
            sesuaikan index jika urutan data berbeda
          */}
                      {getImg(3) ? (
                        <div
                          onClick={() => handleOpen(3)}
                          className="relative cursor-pointer overflow-hidden  shadow-md md:h-[240px] h-[100px]"
                        >
                          <img
                            src={STRAPI_URL + getImg(3).attributes.url}
                            alt={getImg(3).attributes.name || `img-3`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold">
                            Klik untuk lihat
                          </div>
                        </div>
                      ) : (
                        <div />
                      )}

                      {getImg(4) ? (
                        <div
                          onClick={() => handleOpen(4)}
                          className="relative cursor-pointer overflow-hidden  shadow-md md:h-[240px] h-[100px]"
                        >
                          <img
                            src={STRAPI_URL + getImg(4).attributes.url}
                            alt={getImg(4).attributes.name || `img-4`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold">
                            Klik untuk lihat
                          </div>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>

                  {/* ========== KOLom KANAN (3 foto vertikal) ========= */}
                  <div className="flex flex-col md:gap-4 gap-2">
                    {/*
          gunakan index 1, 2, 5 untuk foto kolom kanan (atas, tengah, bawah)
          jika datamu hanya 5 item, index 5 mungkin undefined — handle dengan getImg
        */}
                    {getImg(1) && (
                      <div
                        onClick={() => handleOpen(1)}
                        className="relative cursor-pointer overflow-hidden  shadow-md md:h-[250px] h-[100px]"
                      >
                        <img
                          src={STRAPI_URL + getImg(1).attributes.url}
                          alt={getImg(1).attributes.name || `img-1`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold">
                          Klik untuk lihat
                        </div>
                      </div>
                    )}

                    {getImg(2) && (
                      <div
                        onClick={() => handleOpen(2)}
                        className="relative cursor-pointer overflow-hidden  shadow-md md:h-[510px] h-[316px]"
                      >
                        <img
                          src={STRAPI_URL + getImg(2).attributes.url}
                          alt={getImg(2).attributes.name || `img-2`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold">
                          Klik untuk lihat
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Modal popup */}
                {isOpen && (
                  <GalleryModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    images={data?.data?.attributes?.portfolios?.data}
                    startIndex={currentIndex}
                  />
                )}
              </div>
            </div>
          </div>

          {/* <div>
            <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
              Kantor Cabang
            </h1>
            <Link
              href={footer.data.attributes.office_branch_link_maps}
              target="_blank"
              className="hover:text-[#44CBEB]"
            >
              {footer.data.attributes.office_branch}
            </Link>
            <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
              Kantor Pusat
            </h1>
            <Link
              href={footer.data.attributes.office_center_link_maps}
              target="_blank"
              className="hover:text-[#44CBEB]"
            >
              {footer.data.attributes.office_center}
            </Link>
          </div> */}
        </div>
      </div>
      <div className="mb-6">
        <Clients clients={clients} reviews={reviews} />
      </div>
    </div>
  );
}
