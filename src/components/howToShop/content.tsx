"use client";
import React, { ChangeEvent, useState } from "react";
import { AboutProps } from "@/types/about";
import CarouselBanner from "../atoms/carouselbannerabout";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import Clients from "../home/clients";
import { ClientProps } from "@/types/client";
import styled, { keyframes, css } from "styled-components";
import Image from "next/image";
import { STRAPI_URL } from "@/app/utils/constans";
import CarouselBannerPortfolio from "../atoms/carouselbannerportfolio";
import { FooterProps } from "@/types/footer";
import { HowToShopProps } from "@/types/howToShop";
import "../../app/blockStyle.css";
import Link from "next/link";

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
          <div
            className="customStyle mt-6"
            dangerouslySetInnerHTML={{
              __html: data.data.attributes.content,
            }}
          />
        </div>
      </div>
    </div>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #02203c;
`;

const Note = styled.div`
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 40px;
  color: #7c8e9a;
`;

const Marquee = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  user-select: none;

  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );
`;

const scrollX = keyframes`
  from {
    left: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const common = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  width: 100%;
  animation: ${scrollX} 30s linear infinite;
`;

const MarqueeGroup = styled.div`
  ${common}
`;
const MarqueeGroup2 = styled.div`
  ${common}
  animation-direction: reverse;
  animation-delay: -3s;
`;

const ImageGroup = styled.div`
  display: grid;
  place-items: center;
  width: clamp(10rem, 1rem + 40vmin, 30rem);
  padding: 0;
  margin-right: 5px;
  margin-left: 5px;
`;

// const Image = styled.img`
//   object-fit: contain;
//   width: 100%;
//   height: 100%;
//   /* border: 1px solid black; */
//   border-radius: 0.5rem;
//   aspect-ratio: 16/9;
//   padding: 5px 20px;
// `;
