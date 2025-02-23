"use client";

import { STRAPI_URL } from "@/app/utils/constans";
import { PromosProps } from "@/types/promos";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import {
  calculateDiscount,
  formatNumberToLetter,
  formatRupiah,
} from "@/app/lib/utils";
import { NewsProps } from "@/types/news";
import CardNews from "../atoms/cardNews";

type NewsPageProps = {
  data: NewsProps;
};

export default function Content({ data }: NewsPageProps) {
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
              className="ms-2 font-medium hover:text-[#2FD1C1]"
              href={"/news"}
            >
              <p>Berita</p>
            </Link>
          </div>
          <div>
            {data.data.length ? (
              <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                {data.data.map((item, index) => (
                  <div key={index}>
                    <CardNews {...item} />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`w-full flex justify-center my-24 ${cx(
                  poppins,
                  poppins.className
                )}`}
              >
                <div>
                  <Image
                    src="/assets/icons/empty.jpg"
                    width={200}
                    height={200}
                    alt="logo-horizontal"
                  />
                  <h1 className="text-center font-bold text-[#44CBEB]">
                    Data Kosong!
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
