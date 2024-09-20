"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CartProps } from "@/types/cart";
import { UserProps } from "@/types/users";
import { useUser } from "../authContext";
import { getDecryptedLocalStorage } from "@/app/lib/utils";

export const BottomBar = () => {
  let storedImageData: CartProps[] | null = null;

  if (typeof window !== "undefined") {
    storedImageData =
      typeof window !== "undefined" &&
      JSON.parse(
        getDecryptedLocalStorage(localStorage.getItem("dataCart")) || "null"
      );
  }

  const { value, setUser } = useUser();

  return (
    <div className="fixed bottom-0 left-0 z-[5] w-full bg-white p-4 shadow-inner md:hidden z-[999999]">
      <div className="flex items-center justify-between">
        <Link href={"/products"}>
          <Image
            unoptimized
            src="/assets/icons/wallpaper.png"
            width={25}
            height={25}
            alt="wallpaper-icon"
          />
        </Link>
        <Link href="/">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Icons">
              <path
                id="Rectangle 2804"
                d="M10 21.1143H5C3.89543 21.1143 3 20.2189 3 19.1143V12.4113C3 11.8995 3.19615 11.4073 3.54809 11.0358L10.5481 3.64689C11.3369 2.81421 12.663 2.8142 13.4519 3.64689L20.4519 11.0358C20.8038 11.4073 21 11.8995 21 12.4113V19.1143C21 20.2189 20.1046 21.1143 19 21.1143H14M10 21.1143V15.6143C10 15.3382 10.2239 15.1143 10.5 15.1143H13.5C13.7761 15.1143 14 15.3382 14 15.6143V21.1143M10 21.1143H14"
                stroke="#1F1F22"
                strokeWidth="1.5"
              />
            </g>
          </svg>
        </Link>

        <Link href="/cart">
          <div className="relative flex">
            <Image
              unoptimized
              src="/assets/icons/cart - 2.svg"
              width={25}
              height={25}
              alt="cart-icon"
            />
            <div>
              <span className="absolute bottom-3 left-3 rounded-full bg-[#44CBEB] bg-[#44CBEB] px-[6.5px] py-[2px] text-sm text-xs font-bold text-white">
                {storedImageData?.length
                  ? storedImageData?.length.toString()
                  : "0"}
              </span>
            </div>
          </div>
        </Link>
        {value && (
          <Link href="/profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};
