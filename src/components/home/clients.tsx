"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import cx from "classnames";
import Image from "next/image";
import { poppins } from "@/app/fonts";
import styled, { keyframes, css } from "styled-components";
import CarouselReview from "../atoms/carouselreview";
import { ClientProps } from "@/types/client";
import { STRAPI_URL } from "@/app/utils/constans";
import { ReviewsProps } from "@/types/reviews";
import Link from "next/link";

type ClientSectionProps = {
  clients: ClientProps;
  reviews: ReviewsProps;
};

export default function Clients({ clients, reviews }: ClientSectionProps) {
  return (
    <>
      <div className="mt-10">
        <div className="container mx-auto">
          <div className="md:mx-10 mx-4 bg-[#E4E4E4] px-2 py-6 rounded-2xl relative">
            <div className="flex items-center flex-col">
              <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
                Our Clients
              </h1>
              <div className="md:h-[3px] h-[1px] lg:w-[300px] md:w-[500px] w-[300px] bg-[#20D3B6] text-center"></div>
              <div className="w-full mt-4">
                <Wrapper>
                  <Marquee>
                    <MarqueeGroup>
                      {clients.data.map((el, index) => (
                        <ImageGroup key={index}>
                          <Image
                            loading="lazy"
                            src={`${STRAPI_URL}${el.attributes.logo.data.attributes.formats.small.url}`}
                            width={500}
                            height={500}
                            alt="logo"
                            className="flex object-contain rounded-md"
                          />
                        </ImageGroup>
                      ))}
                    </MarqueeGroup>
                    <MarqueeGroup>
                      {clients.data.map((el, index) => (
                        <ImageGroup key={index}>
                          <Image
                            loading="lazy"
                            src={`${STRAPI_URL}${el.attributes.logo.data.attributes.formats.small.url}`}
                            width={500}
                            height={500}
                            alt="logo"
                            className="flex object-contain rounded-md"
                          />
                        </ImageGroup>
                      ))}
                    </MarqueeGroup>
                  </Marquee>
                </Wrapper>
                <div className="mt-4">
                  <CarouselReview reviews={reviews} />
                </div>
              </div>
            </div>
            <div
              className={`${cx(
                poppins,
                poppins.className
              )} absolute bottom-4 right-4`}
            >
              <Link
                href="https://www.google.com/search?q=wallpaper+indonesia&sca_esv=414fa47fd96e69ee&sca_upv=1&rlz=1C1GCEA_enID1086ID1086&sxsrf=ADLYWIK_UstJZl05duQip1NKLklh7NpELg%3A1727113104965&ei=kKfxZuXWOuuD4-EPupDL4Qo&oq=wall&gs_lp=Egxnd3Mtd2l6LXNlcnAiBHdhbGwqAggBMgQQIxgnMgoQIxiABBgnGIoFMg0QABiABBixAxhDGIoFMggQABiABBixAzIIEAAYgAQYsQMyDRAAGIAEGLEDGEMYigUyCBAAGIAEGLEDMgoQABiABBhDGIoFMgoQABiABBhDGIoFMgsQABiABBixAxiDAUjqHlDeC1ibFnACeACQAQCYAX2gAc4DqgEDNC4xuAEDyAEA-AEBmAIGoAKJBMICERAuGIAEGLEDGNEDGIMBGMcBwgIFEAAYgATCAhAQLhiABBjRAxhDGMcBGIoFwgIQEAAYgAQYsQMYQxiDARiKBcICDRAuGIAEGLEDGEMYigXCAggQLhiABBixA8ICHxAuGIAEGNEDGEMYxwEYigUYlwUY3AQY3gQY4ATYAQGYAwCIBgG6BgYIARABGBSSBwM0LjKgB404&sclient=gws-wiz-serp&lqi=ChN3YWxscGFwZXIgaW5kb25lc2lhSPqNleGZr4CACFohEAAYABgBIhN3YWxscGFwZXIgaW5kb25lc2lhKgQIAhAAkgESaW50ZXJpb3JfZGVjb3JhdG9yqgFFCggvbS8wM3J5bhABMh4QASIaXdmSO1WupQ2OS5vwJyHYGJ1AKP75raN6powyFxACIhN3YWxscGFwZXIgaW5kb25lc2lh#lkt=LocalPoiReviews&lrd=0x2e6a1d5c9b8ff343:0x2962cd502951c88c,3,,,,&rlimm=2982171647446993036"
                target="blank"
                className="bg-[#44CBEB] p-2 font-medium text-white rounded-lg text-[10px] md:text-sm"
              >
                Tulis Review
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
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
