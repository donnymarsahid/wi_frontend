"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import CarouselBannerPromoProduct from "../atoms/carouselbannerpromoproduct";
import { PromosProps } from "@/types/promos";


type PromosSectionProps = {
  promos: PromosProps; 
};


export default function PromoAndProduct({promos}: PromosSectionProps) {
  
  return (
    <>
      <div className="mt-10">
        <div className="container mx-auto">
          <div className="md:mx-10 mx-4">
            <div className="flex items-start flex-col">
              <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
                Promo Terkini & Product Terbaru
              </h1>
              <div className="md:h-[3px] h-[1px] lg:w-[300px] md:w-[500px] w-[300px] bg-[#20D3B6] text-center"></div>
              <div className="w-full mt-6">
                <CarouselBannerPromoProduct promos={promos} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
