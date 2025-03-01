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
import { ProductsProps, ProductsPropsDaum } from "@/types/products";
import CardProductToDetail from "../atoms/cardProductToDetail";
import { FlashSaleProps } from "@/types/flashsale";
import { FlashSale } from "../atoms/flashsale";

type PromosPageProps = {
  data: ProductsPropsDaum[];
  query: {
    q: string;
    styleFilter: string;
  };
};

export default function Content(flashsale: FlashSaleProps) {
  return (
    <div className="mt-10 mb-10">
      <FlashSale {...flashsale} />
      <div className="container mx-auto">
        <div className="md:mx-10 mx-4">
          <div className=" ">
            <div>
              {flashsale.data.attributes?.products?.data?.length ? (
                <>
                  <div className="grid gap-4 lg:grid-cols-4 grid-cols-2">
                    {flashsale.data.attributes?.products?.data?.length &&
                      flashsale.data.attributes?.products?.data?.map(
                        (item, index) => (
                          <div key={index}>
                            <CardProductToDetail {...item} />
                          </div>
                        )
                      )}
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
