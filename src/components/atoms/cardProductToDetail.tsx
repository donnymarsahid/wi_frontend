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

export default function CardProductToDetail(item: ProductsPropsDaum | any) {
  return (
    <>
      <Link href={`/products/${item.attributes?.slug || ""}`}>
        <div className="relative mt-4 overflow-hidden cursor-pointer">
          {item.attributes?.images?.data[0]?.attributes?.url && (
            <Image
              src={`${STRAPI_URL}${item.attributes.images.data[0].attributes.url}`}
              width={400}
              height={400}
              alt="wall"
              className="w-full  object-cover transform transition-transform duration-500 hover:scale-110"
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
                )} font-bold p-2 border-l-[1px] border-r-[1px] border-t-[1px] border-[#A5A5A5] lg:text-[18px] text-[10px] text-start`}
              >
                {item?.attributes?.brands?.data[0]?.attributes?.title}{" "}
                {item.attributes.title}
              </h3>
              <div
                className={`${cx(
                  poppins,
                  poppins.className
                )} flex justify-between items-center p-2  border-l-[1px] border-r-[1px] border-[#A5A5A5]`}
              >
                <div className="md:text-xs text-[9px] text-[#474747]">
                  <table>
                    <tbody>
                      <tr
                        className={
                          item?.attributes?.brands?.data[0]?.attributes
                            ?.thickness
                            ? ""
                            : "hidden"
                        }
                      >
                        <td>Ketebalan</td>
                        <td>
                          :{" "}
                          {
                            item?.attributes?.brands?.data[0]?.attributes
                              ?.thickness
                          }{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <p className="font-medium">
                      Ukuran:{" "}
                      <span className="inline-block whitespace-normal break-words">
                        Panjang{" "}
                        {
                          item?.attributes?.brands?.data[0]?.attributes
                            ?.size_height
                        }{" "}
                        {
                          item?.attributes?.brands?.data[0]?.attributes
                            ?.unitOfMeasureHeight
                        }{" "}
                        x Lebar{" "}
                        {
                          item?.attributes?.brands?.data[0]?.attributes
                            ?.size_width
                        }{" "}
                        {
                          item?.attributes?.brands?.data[0]?.attributes
                            ?.unitOfMeasureWidth
                        }
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between border-l-[1px] border-r-[1px] border-b-[1px] border-[#A5A5A5] relative">
                <div>
                  <div className={`${cx(poppins, poppins.className)} ps-2`}>
                    <div className="flex flex-col mt-2 pb-2">
                      <div className="text-sm">
                        {/* START */}
                        <div
                          className={`${
                            item?.attributes?.brands?.data[0]?.attributes
                              ?.discount
                              ? ""
                              : "hidden"
                          } flex`}
                        >
                          <p className="text-[#FF0000] line-through md:text-sm text-[9.5px]">
                            {formatRupiah(
                              parseFloat(
                                item?.attributes?.brands?.data[0]?.attributes
                                  ?.price
                              )
                            )}
                          </p>
                        </div>
                        {/* END */}
                      </div>
                      <div className="text-[14.5px]">
                        <div>
                          <p className="md:text-[14.5px] text-[9.5px] font-medium text-[#474747]">
                            {!item?.attributes?.brands?.data[0]?.attributes
                              ?.discount &&
                              formatRupiah(
                                parseFloat(
                                  item?.attributes?.brands?.data[0]?.attributes
                                    ?.price
                                )
                              )}
                            {calculateDiscount(
                              parseFloat(
                                item?.attributes?.brands?.data[0]?.attributes
                                  ?.price
                              ),
                              item?.attributes?.brands?.data[0]?.attributes
                                ?.discount?.type
                                ? item?.attributes?.brands?.data[0]?.attributes
                                    ?.discount?.type
                                : "",
                              item?.attributes?.brands?.data[0]?.attributes
                                ?.discount?.value
                                ? parseFloat(
                                    item?.attributes?.brands?.data[0]
                                      ?.attributes?.discount?.value
                                  )
                                : 0
                            )}{" "}
                            /{" "}
                            <span className="capitalize md:text-[14.5px] text-[9.5px]">
                              {item?.attributes?.brands?.data[0]?.attributes
                                ?.unit
                                ? String(
                                    item?.attributes?.brands?.data[0]
                                      ?.attributes?.unit
                                  ).toLowerCase()
                                : ""}
                            </span>
                          </p>
                        </div>
                      </div>
                      {item?.attributes?.brands?.data[0]?.attributes
                        ?.pricePerMeter ? (
                        <div className="flex justify-between items-center">
                          <div></div>
                          <p className="md:text-sm text-[9.5px] font-medium">
                            {
                              item?.attributes?.brands?.data[0]?.attributes
                                ?.pricePerMeter
                            }
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`pe-2 absolute top-0 right-0 ${cx(
                    poppins,
                    poppins.className
                  )}`}
                >
                  {item?.attributes?.brands?.data[0]?.attributes?.discount ? (
                    <>
                      <div className="shadow-lg flex flex-row items-center justify-center bg-gradient-to-r from-[#FF0000] to-red-700 rounded-md md:px-4 md:py-2 text-white border-[1px] border-white p-1">
                        <p className="font-bold md:text-[18px] text-[12px]">
                          {item?.attributes?.brands?.data[0]?.attributes
                            ?.discount?.type == "discount_percentage"
                            ? `${item?.attributes?.brands?.data[0]?.attributes?.discount?.value}%`
                            : formatNumberToLetter(
                                item?.attributes?.brands?.data[0]?.attributes
                                  ?.discount?.value
                                  ? parseFloat(
                                      item?.attributes?.brands?.data[0]
                                        ?.attributes?.discount?.value
                                    )
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
