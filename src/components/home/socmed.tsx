"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import Link from "next/link";

export default function Socmed() {
  const socmed = [
    {
      url: "/assets/dummy/yt.png",
      link: "#",
    },
    {
      url: "/assets/dummy/tt.png",
      link: "#",
    },
    {
      url: "/assets/dummy/ig.png",
      link: "#",
    },
    {
      url: "/assets/dummy/sp.png",
      link: "#",
    },
    {
      url: "/assets/dummy/tp.png",
      link: "#",
    },
  ];
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
                {socmed.map((item, index) => (
                  <li key={index} className="me-2">
                    <Link href={item.link}>
                      <Image src={item.url} width={50} height={50} alt="wp" />
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
