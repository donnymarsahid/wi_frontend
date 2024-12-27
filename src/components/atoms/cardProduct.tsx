import { poppins } from "@/app/fonts";
import {
  calculateDiscount,
  formatNumberToLetter,
  formatRupiah,
} from "@/app/lib/utils";
import { STRAPI_URL } from "@/app/utils/constans";
import { Daum3, Daum7 } from "@/types/categories";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import cx from "classnames";

export default function CardProduct(item: Daum7 | any) {
  return (
    <>
      <Link href={`/category/product/${item.attributes?.slug || ""}`}>
        <div className="relative mt-4 overflow-hidden cursor-pointer">
          {item.attributes?.images?.data?.length &&
            item.attributes?.images?.data[0]?.attributes?.url && (
              <Image
                src={`${STRAPI_URL}${item.attributes.images.data[0].attributes.url}`}
                placeholder="blur"
                blurDataURL={`${STRAPI_URL}${item.attributes.images.data[0].attributes.url}?w=30&q=10`} // Placeholder low-res
                width={400}
                height={400}
                alt="wall"
                className="w-full md:h-[284px] h-[135px] object-cover transform transition-transform duration-500 hover:scale-110"
              />
            )}
        </div>
        <div>
          <div className="w-full">
            <div className="bg-white">
              <h3 className="font-bold lucida-bright p-2 border-[1px] border-[#A5A5A5] lg:text-[18px] text-[10px] text-center">
                {item.attributes.title}
              </h3>
              <div
                className={`${cx(
                  poppins,
                  poppins.className
                )} flex justify-between items-center p-2 border-b-[1px] border-l-[1px] border-r-[1px] border-[#A5A5A5]`}
              >
                <div className="md:text-xs text-[9px] text-[#474747]">
                  <p>Ukuran</p>
                  <p>Lebar: {item.attributes.size_width} cm</p>
                  <p>Panjang: {item.attributes.size_height} cm</p>
                </div>
                {item.attributes.discount ? (
                  <>
                    <div className="shadow-lg flex flex-col items-center justify-center bg-gradient-to-r from-[#FF0000] to-red-700 rounded-md px-4 py-2 text-white border-[1px] border-white">
                      <p className="font-bold">
                        {item.attributes.discount?.type == "discount_percentage"
                          ? `${item.attributes.discount?.value}%`
                          : formatNumberToLetter(
                              item.attributes.discount?.value
                                ? parseFloat(item.attributes.discount?.value)
                                : 0
                            )}
                      </p>
                      <p className="text-xs uppercase font-medium">Off</p>
                    </div>
                  </>
                ) : (
                  <div className="md:text-sm text-[10px] font-semibold flex items-center flex-col text-white bg-transparent lg:px-4 lg:py-3 px-2 py-1 rounded-full lucida-bright">
                    <p className="text-transparent">Disc</p>
                    <p>-</p>
                  </div>
                )}
              </div>
              <div
                className={`${cx(
                  poppins,
                  poppins.className
                )} flex justify-between items-center p-2 border-b-[1px] border-l-[1px] border-r-[1px] border-[#A5A5A5]`}
              >
                <div className="text-sm">
                  {/* START */}
                  <div
                    className={`${
                      item.attributes.discount ? "" : "hidden"
                    } flex`}
                  >
                    <p className="text-[#FF0000] line-through md:text-lg text-[9.5px]">
                      {formatRupiah(parseFloat(item.attributes.price))}
                    </p>
                  </div>
                  {/* END */}
                </div>
                <div className="text-sm">
                  <div>
                    <p className="md:text-lg text-[9.5px] font-medium text-[#474747]">
                      {!item.attributes.discount &&
                        formatRupiah(parseFloat(item.attributes.price))}
                      {calculateDiscount(
                        parseFloat(item.attributes.price),
                        item.attributes.discount?.type
                          ? item.attributes.discount?.type
                          : "",
                        item.attributes.discount?.value
                          ? parseFloat(item.attributes.discount?.value)
                          : 0
                      )}{" "}
                      /{" "}
                      <span className="capitalize">
                        {item.attributes.unit
                          ? String(item.attributes.unit).toLowerCase()
                          : ""}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
