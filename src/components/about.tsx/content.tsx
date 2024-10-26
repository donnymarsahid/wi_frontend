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
          <div>
            <div className="w-full my-16">
              <h1 className="lg:text-[35px] md:text-[28px] lucida-bright text-center">
                Klien Kami
              </h1>
              <Wrapper>
                <Marquee>
                  <MarqueeGroup>
                    {clients.data.map((el, index) => (
                      <Image loading="lazy"Group key={index}>
                        <Image loading="lazy"
                          src={`${STRAPI_URL}${el.attributes.logo.data.attributes.url}`}
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
                      <Image loading="lazy"Group key={index}>
                        <Image loading="lazy"
                          src={`${STRAPI_URL}${el.attributes.logo.data.attributes.url}`}
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
            </div>
          </div>
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
