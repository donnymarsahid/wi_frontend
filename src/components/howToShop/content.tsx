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
import { HowToShopProps } from "@/types/howToShop";
import "../../app/blockStyle.css";
import Link from "next/link";
import MarkdownComponent from "../atoms/markdown";

type HowToShopDetailProps = {
  data: HowToShopProps;
};

export default function Content({ data }: HowToShopDetailProps) {
  return (
    <div>
      <div
        className={`container mx-auto mt-[120px] md:mt-[150px] lg:mt-[0px] ${cx(
          poppins,
          poppins.className
        )}`}
      >
        <div className="md:mx-10 mx-4">
          <div
            className={`bg-[#F3F4F6] p-4 flex justify-start ${cx(
              poppins,
              poppins.className
            )} text-[#5BC7E1]`}
          >
            <Link className="me-2 font-medium hover:text-[#2FD1C1]" href={"/"}>
              <p>Beranda</p>
            </Link>
            <p>/</p>
            <Link
              className="ms-2 font-medium hover:text-[#2FD1C1]"
              href={"/howToShop"}
            >
              <p>Cara Belanja</p>
            </Link>
          </div>
          <MarkdownComponent markdown={data.data.attributes.content} />
        </div>
      </div>
    </div>
  );
}
