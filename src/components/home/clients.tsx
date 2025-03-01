"use client";
import React from "react";
import Image from "next/image";
import { poppins } from "@/app/fonts";
import Link from "next/link";
import { ClientProps } from "@/types/client";
import { STRAPI_URL } from "@/app/utils/constans";
import { ReviewsProps } from "@/types/reviews";
import CarouselReview from "../atoms/carouselreview";
import Marquee from "react-fast-marquee";

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
                <div className="mt-4">
                  <CarouselReview reviews={reviews} />
                </div>
              </div>
            </div>
            <div className={`${poppins.className} absolute bottom-4 right-4`}>
              <Link
                href="https://g.page/r/CYzIUSlQzWIpEAE/review"
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
