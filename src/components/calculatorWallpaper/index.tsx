"use client";

import React from "react";
import WallpaperCalculator from "../atoms/wallpaperCalculator";
import Link from "next/link";
import cx from "classnames";
import { poppins } from "@/app/fonts";

const CalcWallp = () => {
  return (
    <main className="mt-[100px] md:mt-[200px] lg:mt-[100px]">
      <div className="my-8">
        <div className="container mx-auto mt-[120px] md:mt-[150px] lg:mt-[0px] ">
          <div
            className={`bg-[#F3F4F6] p-4 flex justify-start md:mx-10 mx-4 mb-8 ${cx(
              poppins,
              poppins.className
            )} text-[#5BC7E1]`}
          >
            <Link className="me-2 font-medium hover:text-[#2FD1C1]" href={"/"}>
              <p>Beranda</p>
            </Link>
            <p>/</p>
            <Link
              className="ms-2 me-2 font-medium hover:text-[#2FD1C1]"
              href={`/category/wallpaper--Wallpaper`}
            >
              <p className="title-custom-2">Wallpaper </p>
            </Link>
            /
            <Link className="ms-2 font-medium hover:text-[#2FD1C1]" href={"#"}>
              <p className="title-custom-2">Calculator Wallpaper</p>
            </Link>
          </div>
          <div className="md:mx-10 mx-4">
            <WallpaperCalculator />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CalcWallp;
