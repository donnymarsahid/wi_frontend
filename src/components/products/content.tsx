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
import { ProductsProps } from "@/types/products";
import CardProductToDetail from "../atoms/cardProductToDetail";

type PromosPageProps = {
  data: ProductsProps;
  query: string;
};

export default function Content({ data, query }: PromosPageProps) {
  return (
    <div className="mt-10 mb-10">
      <div className="container mx-auto">
        <div className="md:mx-10 mx-4">
          <div className=" ">
            <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
              Products
            </h1>
            <div className="md:h-[3px] h-[1px] w-[120px] bg-[#20D3B6] text-center"></div>
            {query && (
              <div className={cx(poppins, poppins.className)}>
                <p>Pencarian Product : {query}</p>
              </div>
            )}
            <div>
              {data.data.length ? (
                <>
                  <div className="grid gap-4 lg:grid-cols-4 grid-cols-2">
                    {data?.data?.length &&
                      data?.data?.map((item, index) => (
                        <div key={index}>
                          <CardProductToDetail {...item} />
                        </div>
                      ))}
                  </div>
                </>
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
    </div>
  );
}
