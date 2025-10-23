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
          <div>
            <Clients clients={clients} reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
