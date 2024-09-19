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

type PromosPageProps = {
  data: ProductsProps;
};

export default function Content({ data }: PromosPageProps) {
  return (
    <div className="mt-10 mb-10">
      <div className="container mx-auto">
        <div className="md:mx-10 mx-4">
          <div className=" ">
            <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
              Products
            </h1>
            <div className="md:h-[3px] h-[1px] w-[120px] bg-[#20D3B6] text-center"></div>
            <div>
              {data.data.length ? (
                <>
                  <div className="grid gap-4 lg:grid-cols-4 grid-cols-2">
                    {data?.data?.length &&
                      data?.data?.map((item, index) => (
                        <Link href={item.attributes?.slug || ""}>
                          <div
                            key={index}
                            className="relative mt-4 overflow-hidden cursor-pointer"
                          >
                            {item.attributes?.images?.data[0]?.attributes
                              ?.url && (
                              <Image
                                src={`${STRAPI_URL}${item.attributes.images.data[0].attributes.url}`}
                                width={400}
                                height={400}
                                alt="wall"
                                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
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
                                    <p>Lebar: {item.attributes.size_width}</p>
                                    <p>
                                      Panjang: {item.attributes.size_height}
                                    </p>
                                  </div>
                                  {item.attributes.discount ? (
                                    <div className="md:text-sm text-[10px] font-semibold flex items-center flex-col text-white bg-[#FF0000] lg:px-4 lg:py-3 px-2 py-1 rounded-full lucida-bright">
                                      <p className="uppercase">Disc</p>
                                      <p>
                                        {item.attributes.discount?.type ==
                                        "discount_percentage"
                                          ? `${item.attributes.discount?.value}%`
                                          : formatNumberToLetter(
                                              item.attributes.discount?.value
                                                ? parseFloat(
                                                    item.attributes.discount
                                                      ?.value
                                                  )
                                                : 0
                                            )}
                                      </p>
                                    </div>
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
                                        {formatRupiah(
                                          parseFloat(item.attributes.price)
                                        )}
                                      </p>
                                    </div>
                                    {/* END */}
                                  </div>
                                  <div className="text-sm">
                                    <div>
                                      <p className="md:text-lg text-[9.5px] font-medium text-[#474747]">
                                        {!item.attributes.discount &&
                                          formatRupiah(
                                            parseFloat(item.attributes.price)
                                          )}
                                        {calculateDiscount(
                                          parseFloat(item.attributes.price),
                                          item.attributes.discount?.type
                                            ? item.attributes.discount?.type
                                            : "",
                                          item.attributes.discount?.value
                                            ? parseFloat(
                                                item.attributes.discount?.value
                                              )
                                            : 0
                                        )}{" "}
                                        / Roll
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
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
