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

type AboutDetailProps = {
  data: AboutProps;
  clients: ClientProps;
  footer: FooterProps;
};

export default function Content({ data, clients, footer }: AboutDetailProps) {
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
            <div className={`flex justify-center`}>
              <div className="flex items-center flex-col">
                <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
                  Portfolio
                </h1>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="lg:w-[800px] w-full">
                <CarouselBannerPortfolio about={data} />
              </div>
            </div>
          </div>

          {/* <div>
            {data.data.attributes.maps && (
              <div className="my-16 flex justify-center flex-col items-center">
                <h1 className="lg:text-[35px] md:text-[28px] lucida-bright text-center">
                  Maps
                </h1>
                <div
                className="maps-custom"
                  dangerouslySetInnerHTML={{
                    __html: data.data.attributes.maps,
                  }}
                />
              </div>
            )}
          </div> */}
          <div>
            <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
              Kantor Cabang
            </h1>
            <p>{footer.data.attributes.office_branch}</p>
            <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
              Kantor Pusat
            </h1>
            <p>{footer.data.attributes.office_center}</p>
          </div>
          <div className="flex items-center flex-col my-8">
            <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
              Klien Kami
            </h1>
            <div className="md:h-[3px] h-[1px] lg:w-[300px] md:w-[500px] w-[300px] bg-[#20D3B6] text-center"></div>
            <div className="w-full mt-4 overflow-hidden">
              {/* Wrapper div with duplicate content for seamless scrolling */}
              <Marquee>
                {clients.data.map((el, index) => (
                  <div
                    key={`duplicate-${index}`}
                    className="flex-shrink-0 px-2"
                  >
                    <Image
                      src={`${STRAPI_URL}${el.attributes.logo.data.attributes.formats.small.url}`}
                      width={500}
                      height={500}
                      alt="logo"
                      className="object-contain rounded-md lg:w-[250px] md:w-[150px] w-[100px] h-auto"
                    />
                  </div>
                ))}
                {clients.data.map((el, index) => (
                  <div
                    key={`duplicate-${index}`}
                    className="flex-shrink-0 px-2"
                  >
                    <Image
                      src={`${STRAPI_URL}${el.attributes.logo.data.attributes.formats.small.url}`}
                      width={500}
                      height={500}
                      alt="logo"
                      className="object-contain rounded-md lg:w-[250px] md:w-[150px] w-[100px] h-auto"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
