"use client";

import { STRAPI_URL } from "@/app/utils/constans";
import { PromosProps } from "@/types/promos";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import {
  calculateDiscount,
  formatDate,
  formatNumberToLetter,
  formatRupiah,
} from "@/app/lib/utils";
import { NewsProps } from "@/types/news";
import CardNews from "../atoms/cardNews";
import "../../app/blockStyle.css";

type NewsPageProps = {
  data: NewsProps;
};

export default function Detail({ data }: NewsPageProps) {
  return (
    <div className="mt-10 mb-10">
      <div className="container mx-auto">
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
              className="ms-2 me-2 font-medium hover:text-[#2FD1C1]"
              href={"/news"}
            >
              <p>News</p>
            </Link>
            <p>/</p>
            <Link
              className="ms-2 me-2 font-medium hover:text-[#2FD1C1] title-custom-2"
              href={`/news/${data.data[0].attributes.slug}`}
            >
              <p>{data.data[0].attributes.title}</p>
            </Link>
          </div>
          <div className="mt-6">
            <div className="bg-[#F3F4F6] p-1">
              <Image
                src={`${STRAPI_URL}${data.data[0].attributes.banner.data.attributes.url}`}
                width={400}
                height={400}
                alt="wall"
                className="w-full md:h-[300px] h-[100px] object-cover "
              />
            </div>
            <div className="p-2">
              <h3 className="font-bold lucida-bright lg:text-[18px] text-[10px] title-custom text-[14px]">
                {data.data[0].attributes.title}
              </h3>
              <div className="flex items-center py-2">
                <Image
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
                  {formatDate(data.data[0].attributes.date)}
                </p>
              </div>
              <p
                className={`title-custom text-[14px] ${cx(
                  poppins,
                  poppins.className
                )}`}
              >
                {data.data[0].attributes.description}
              </p>
              <div
                className="customStyle mt-6"
                dangerouslySetInnerHTML={{
                  __html: data.data[0].attributes.content,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
