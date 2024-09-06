"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import cx from "classnames";
import Image from "next/image";
import { poppins } from "@/app/fonts";
import styled, { keyframes, css } from "styled-components";
import CarouselReview from "../atoms/carouselreview";

export default function Clients() {
  const clients = [
    {
      url: "/assets/dummy/logo-1.png",
    },
    {
      url: "/assets/dummy/logo-2.png",
    },
    {
      url: "/assets/dummy/logo-3.png",
    },
    {
      url: "/assets/dummy/logo-4.png",
    },
  ];

  const row1 = [
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/7ae42bac3b34999c0db3.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/b2bd91d7b87b2181ca45.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6591cdc0702b32310306.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3b7d9f4b073deb6a9b74.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3cd767dea94a85078ca4.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/a2b3c3709ffedce2a22a.png",
  ];

  const row2 = [
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/9dd55e54b5a28658bf4e.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/0384060dcbf73b6a707c.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/35e044b3354aaa0caed5.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/f50ae7cbf6cc805bdadc.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png",
  ];
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
                      {clients.map((el, index) => (
                        <ImageGroup key={index}>
                          <Image
                            src={el.url}
                            width={500}
                            height={500}
                            alt="logo"
                            className="flex object-contain rounded-md"
                          />
                        </ImageGroup>
                      ))}
                    </MarqueeGroup>
                    <MarqueeGroup>
                      {clients.map((el, index) => (
                        <ImageGroup key={index}>
                          <Image
                            src={el.url}
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
                  <CarouselReview />
                </div>
              </div>
            </div>
            <div
              className={`${cx(
                poppins,
                poppins.className
              )} absolute bottom-4 right-4`}
            >
              <button className="bg-[#44CBEB] p-2 font-medium text-white rounded-lg text-[10px] md:text-sm">
                Tulis Review
              </button>
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
