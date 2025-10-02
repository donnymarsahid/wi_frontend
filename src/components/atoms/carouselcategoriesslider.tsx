"use client";

import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { HomepageProps } from "@/types/homepage";
import { STRAPI_URL } from "@/app/utils/constans";
import { CategoryProps } from "@/types/categories";
import cx from "classnames";
import { poppins } from "@/app/fonts";

type HeroHomeProps = {
  categories: any;
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

// Versi Tidak Slider
export default function CarouselCategoriesSlider({
  categories,
}: HeroHomeProps) {
  return (
    <>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-4">
        {categories
          .sort(
            (a, b) =>
              new Date(b.attributes.date).getTime() -
              new Date(a.attributes.date).getTime()
          )
          .map((item, index) => (
            <Link
              href={`#${item.attributes.name}`}
              className="w-full"
              key={index}
            >
              <div
                key={index}
                className="overflow-hidden cursor-pointer rounded-t-lg md:h-[80px] h-[50px] me-4 w-full"
              >
                {item.attributes?.thumbnail?.data?.attributes?.url && (
                  <Image
                    src={`${STRAPI_URL}${item.attributes?.thumbnail?.data?.attributes?.url}`}
                    width={400}
                    height={400}
                    alt="wall"
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110 rounded-t-lg border-s-[0.9px] md:border-s-[1.2px] border-e-[0.9px] md:border-e-[1.2px] border-t-[0.9px] md:border-t-[1.2px] border-[#201E1C]"
                  />
                )}
              </div>
              <div>
                <div className="w-full rounded-b-lg border-s-[0.9px] md:border-s-[1.2px] border-e-[0.9px] md:border-e-[1.2px] border-b-[0.9px] md:border-b-[1.2px] border-[#201E1C]">
                  <div
                    className={`flex justify-center ${cx(
                      poppins,
                      poppins.className
                    )}`}
                  >
                    <h3 className="py-1 px-3 bg-white  lg:text-[15px] text-[8.5px] text-center rounded-lg">
                      {item.attributes.name.replace("Lantai", "")}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
