"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import Link from "next/link";
import { ProductsProps, ProductsPropsDaum } from "@/types/products";
import { STRAPI_URL } from "@/app/utils/constans";
import {
  calculateDiscount,
  formatNumberToLetter,
  formatRupiah,
} from "@/app/lib/utils";
import { CategoryProps } from "@/types/categories";
import CardProduct from "../atoms/cardProduct";

type HeroCategoryClearanceProps = {
  categories: CategoryProps;
};

export default function Clearance({ categories }: HeroCategoryClearanceProps) {
  const productsClearanceResult: any[] =
    categories.data[0].attributes.brands.data.filter(
      (item) =>
        item.attributes.sub_categories.data[0].attributes.slug === "clearance"
    );

  return (
    <>
      <div className="mt-10">
        <div className="container mx-auto">
          <div className="md:mx-10 mx-4">
            <div className=" ">
              {/* <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
                <span className="font-bold text-[#FF0000] italic ">
                  Clearance
                </span>{" "}
                Wallpaper
              </h1> */}
              <button className="lg:text-[35px] md:text-[28px] lucida-bright bg-[#10D3A2] px-4 py-1 text-white rounded-lg shadow-lg cursor-default">
                Clearance
              </button>
              <div>
                <div className="grid gap-4 lg:grid-cols-4 grid-cols-2">
                  {productsClearanceResult.map((item, index) => (
                    <CardProduct {...item} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
