import { poppins } from "@/app/fonts";
import {
  calculateDiscount,
  formatDate,
  formatNumberToLetter,
  formatRupiah,
} from "@/app/lib/utils";
import { STRAPI_URL } from "@/app/utils/constans";
import { Daum3, Daum7 } from "@/types/categories";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import cx from "classnames";
import { NewsPropsDaum } from "@/types/news";

export default function CardNews(item: NewsPropsDaum) {
  return (
    <>
      <Link href={`/news/${item.attributes.slug}`}>
        <div className="relative mt-4 overflow-hidden cursor-pointer border-t-[1px] border-l-[1px] border-r-[1px] border-[#A5A5A5] p-2">
          {item.attributes?.thumbnail?.data.attributes?.url && (
            <Image
              loading="lazy"
              src={`${STRAPI_URL}${item.attributes.thumbnail.data.attributes.url}`}
              width={400}
              height={400}
              alt="wall"
              className="w-full md:h-[284px] h-[135px] object-cover transform transition-transform duration-500 hover:scale-110"
            />
          )}
        </div>
        <div>
          <div className="w-full border-[1px] border-[#A5A5A5]">
            <div className="bg-white">
              <div className="p-2">
                <h3 className="font-bold lucida-bright lg:text-[18px] text-[10px] title-custom text-[14px]">
                  {item.attributes.title}
                </h3>
                <div className="flex items-center py-2">
                  <Image
                    loading="lazy"
                    src={"/assets/icons/calender.png"}
                    alt="calender"
                    width={18}
                    height={18}
                    className="me-2"
                  />
                  <p
                    className={`${cx(
                      poppins,
                      poppins.className
                    )} text-[14px] font-semibold text-[#B3B3B3]`}
                  >
                    {formatDate(item.attributes.date)}
                  </p>
                </div>
                <p
                  className={`title-custom text-[14px] ${cx(
                    poppins,
                    poppins.className
                  )}`}
                >
                  {item.attributes.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
