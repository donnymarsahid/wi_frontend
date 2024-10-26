"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import { CategoryProps } from "@/types/categories";
import { STRAPI_URL } from "@/app/utils/constans";
import { ServiceProps } from "@/types/services";
import Link from "next/link";

type CategoriesSectionProps = {
  categories: CategoryProps;
  services: ServiceProps;
};

export default function Categories({
  categories,
  services,
}: CategoriesSectionProps) {
  return (
    <>
      <div className="mt-10">
        <div className="container mx-auto">
          <div className="md:mx-10 mx-4">
            <div className="flex items-center flex-col">
              <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
                Pilihan Produk Dekoratif Interior & Eksterior
              </h1>
              <div className="md:h-[3px] h-[1px] lg:w-[600px] md:w-[500px] w-[300px] bg-[#20D3B6] text-center"></div>
              <div>
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 grid-cols-2">
                  {categories.data.map((item, index) => (
                    <Link
                      key={index}
                      href={`/category/${
                        item.attributes.keyPageCondition
                          ? `${item.attributes.keyPageCondition}--${item.attributes.slug}`
                          : item.attributes.slug
                      }`}
                    >
                      <div
                        key={index}
                        className="relative mt-4 overflow-hidden rounded-lg cursor-pointer"
                      >
                        <Image
                          loading="lazy"
                          src={`${STRAPI_URL}${item.attributes.image.data.attributes.url}`}
                          placeholder="blur"
                          blurDataURL={`${STRAPI_URL}${item.attributes.image.data.attributes.url}?w=30&q=10`} // Placeholder low-res
                          width={400}
                          height={400}
                          alt="wall"
                          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="lucida-bright mt-[-20px] relative">
                        <div className="font-semibold flex justify-center">
                          <div>
                            <h3 className="bg-white py-2 md:px-6 px-2 rounded-lg shadow-lg bg-opacity-85 lg:text-[18px] text-[10px] text-center">
                              {item.attributes.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className={`md:mt-16 mt-6 ${cx(poppins, poppins.className)}`}>
              <div className="p-4 bg-[#F5F5F5] rounded-lg border border-2 border-[#10D3A2] grid gap-3 md:grid-cols-3 grid-cols-1">
                {services.data.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <Image
                      loading="lazy"
                      src={`${STRAPI_URL}${item.attributes.icon.data.attributes.url}`}
                      placeholder="blur"
                      blurDataURL={`${STRAPI_URL}${item.attributes.icon.data.attributes.url}?w=30&q=10`} // Placeholder low-res
                      width={50}
                      height={50}
                      alt="wall"
                      className="w-[40px] lg:w-[50px]"
                    />
                    <p className="ms-2 lg:text-sm text-xs font-medium">
                      {item.attributes.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
