"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import Link from "next/link";
import { HomepageProps } from "@/types/homepage";
import { STRAPI_URL } from "@/app/utils/constans";

type SocmedSectionProps = {
  homepage: HomepageProps;
};

export default function SocmedFlooring({ homepage }: SocmedSectionProps) {
  return (
    <>
      <div className="mt-6 mb-4">
        <div className="container mx-auto">
          <div className="md:mx-10 mx-4 flex justify-between items-center">
            <div>
              <Image
                src="/assets/images/logo-horizontal.png"
                width={300}
                height={300}
                alt="wp"
              />
            </div>
            <div>
              <ul className="flex">
                {homepage.data.attributes.socmed.map((item, index) => (
                  <li key={index} className="me-2">
                    <Link href={item.link} target="blank">
                      <Image
                        src={`${STRAPI_URL}${item.logo.data.attributes.url}`}
                        width={50}
                        height={50}
                        alt="wp"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
