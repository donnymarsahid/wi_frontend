import { poppins } from "@/app/fonts";
import {
  calculateDiscount,
  formatNumberToLetter,
  formatRupiah,
} from "@/app/lib/utils";
import { STRAPI_URL } from "@/app/utils/constans";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import cx from "classnames";
import { ProductsPropsDaum } from "@/types/products";

export default function CardProductToDetailFiltered(
  item: ProductsPropsDaum | any
) {
  return (
    <>
      <Link href={`/products/${item?.slug || ""}`}>
        <div className="relative mt-4 overflow-hidden cursor-pointer">
          {item?.images?.length && item?.images[0]?.url && (
            <Image
              src={`${STRAPI_URL}${item.images[0].url}`}
              placeholder="blur"
              blurDataURL={`${STRAPI_URL}${item.images[0].url}?w=30&q=10`} // Placeholder low-res
              width={400}
              height={400}
              alt="wall"
              className="w-full object-cover transform transition-transform duration-500 hover:scale-110"
            />
          )}
        </div>
        <div>
          <div className="w-full">
            <div className="bg-white">
              <h3
                className={`${cx(
                  poppins,
                  poppins.className
                )} font-bold p-1 border-l-[1px] border-r-[1px] border-t-[1px] border-[#A5A5A5] lg:text-[18px] text-[10px] text-start`}
              >
                {item?.brands[0]?.title} {item.title}
              </h3>
              <div
                className={`${cx(
                  poppins,
                  poppins.className
                )} flex justify-between items-center p-1  border-l-[1px] border-r-[1px] border-[#A5A5A5]`}
              >
                <div className="md:text-xs text-[7.6px]  text-[#474747]">
                  <table>
                    <tbody>
                      <tr
                        className={item?.brands[0]?.thickness ? "" : "hidden"}
                      >
                        <td className="flex items-start md:w-[80px] w-[45px]">
                          <p className="flex flex-row justify-between w-full">
                            Ketebalan <span>: </span>
                          </p>
                        </td>
                        <td>{item?.brands[0]?.thickness}</td>
                      </tr>
                      {item?.brands[0]?.size_height &&
                      item?.brands[0]?.size_width ? (
                        <tr>
                          <td className="flex items-start">
                            <p className="flex flex-row justify-between w-full">
                              Ukuran <span>:</span>
                            </p>
                          </td>
                          <td>
                            <span className="inline-block whitespace-normal break-words">
                              Panjang {item?.brands[0]?.size_height}{" "}
                              {item?.brands[0]?.unitOfMeasureHeight} x Lebar{" "}
                              {item?.brands[0]?.size_width}{" "}
                              {item?.brands[0]?.unitOfMeasureWidth}
                            </span>
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-between border-l-[1px] border-r-[1px] border-b-[1px] border-[#A5A5A5] relative">
                <div>
                  <div className={`${cx(poppins, poppins.className)} ps-1`}>
                    <div className="flex flex-col mt-2 pb-1">
                      <div className="text-sm">
                        {/* START */}
                        <div
                          className={`md:mb-0 mb-[-5px] ${
                            item?.brands[0]?.discount &&
                            item?.brands[0]?.pricePerMeter
                              ? ""
                              : "hidden"
                          } flex`}
                        >
                          <p className="text-[#FF0000] line-through md:text-sm text-[9px]">
                            {formatRupiah(
                              parseFloat(item?.brands[0]?.pricePerMeter)
                            )}
                          </p>
                        </div>
                        {/* END */}
                        {item?.brands[0]?.pricePerMeter ? (
                          <div className="md:mb-0 mb-[-5px]">
                            <p className="md:text-sm text-[9px] font-semibold">
                              {!item?.brands[0]?.discount &&
                                formatRupiah(
                                  parseFloat(item?.brands[0]?.pricePerMeter)
                                )}
                              {calculateDiscount(
                                parseFloat(item?.brands[0]?.pricePerMeter),
                                item?.brands[0]?.discount?.type
                                  ? item?.brands[0]?.discount?.type
                                  : "",
                                item?.brands[0]?.discount?.value
                                  ? parseFloat(item?.brands[0]?.discount?.value)
                                  : 0
                              )}{" "}
                              / m2
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                        {/* START */}
                        <div
                          className={`${
                            item?.brands[0]?.discount ? "" : "hidden"
                          } flex`}
                        >
                          <p className="text-[#FF0000] line-through md:text-sm text-[9px]">
                            {formatRupiah(parseFloat(item?.brands[0]?.price))}
                          </p>
                        </div>
                        {/* END */}
                      </div>
                      <div className="text-[14.5px]">
                        <div>
                          <p className="md:text-[13.5px] 2xl:text-[17.5px] text-[9.5px] font-bold">
                            {!item?.brands[0]?.discount &&
                              formatRupiah(parseFloat(item?.brands[0]?.price))}
                            {calculateDiscount(
                              parseFloat(item?.brands[0]?.price),
                              item?.brands[0]?.discount?.type
                                ? item?.brands[0]?.discount?.type
                                : "",
                              item?.brands[0]?.discount?.value
                                ? parseFloat(item?.brands[0]?.discount?.value)
                                : 0
                            )}{" "}
                            /{" "}
                            <span className="capitalize md:text-[13.5px] 2xl:text-[17.5px] text-[7.5px] font-bold">
                              {item?.brands[0]?.unit
                                ? String(item?.brands[0]?.unit).toLowerCase()
                                : ""}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`pe-1 absolute bottom-[18px] md:bottom-[5px] right-0 ${cx(
                    poppins,
                    poppins.className
                  )}`}
                >
                  {item?.brands[0]?.discount ? (
                    <>
                      <div className="shadow-lg flex flex-row items-center justify-center bg-gradient-to-r from-[#FF0000] to-red-700 rounded-md md:px-4 md:py-2 text-white border-[1px] border-white p-1">
                        <p className="font-bold md:text-[18px] text-[12px]">
                          {item?.brands[0]?.discount?.type ==
                          "discount_percentage"
                            ? `${item?.brands[0]?.discount?.value}%`
                            : formatNumberToLetter(
                                item?.brands[0]?.discount?.value
                                  ? parseFloat(item?.brands[0]?.discount?.value)
                                  : 0
                              )}
                        </p>
                        <p className="ps-1 md:text-[16px] text-[10px] uppercase font-medium">
                          Off
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="md:text-sm text-[10px] font-semibold flex items-center flex-col text-white bg-transparent lg:px-4 lg:py-3 px-2 py-1 rounded-full lucida-bright">
                      <p className="text-transparent">Disc</p>
                      <p>-</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
