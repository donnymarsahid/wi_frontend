"use client";

import { useEffect, useState } from "react";
import { poppins } from "@/app/fonts";
import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import { FlashSaleProps } from "@/types/flashsale";

// Function to calculate the remaining time in days, hours, minutes, and seconds
const calculateTimeLeft = (expiryDate: string) => {
  const difference = +new Date(expiryDate) - +new Date();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)), // Total days remaining
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24), // Remaining hours
      minutes: Math.floor((difference / 1000 / 60) % 60), // Remaining minutes
      seconds: Math.floor((difference / 1000) % 60), // Remaining seconds
    };
  }

  return timeLeft;
};

export const FlashSaleDetailProduct = (flashsale: FlashSaleProps) => {
  const [expiryDate, setExpiryDate] = useState(
    flashsale.data.attributes.expiry_date
  );
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiryDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expiryDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  // Condition to check if the countdown has expired
  const isExpired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (isExpired) {
    return null; // Hide UI if expired
  }

  return (
    <>
      <div className={`${cx(poppins, poppins.className)} `}>
        <div className="">
          <Link
            href={"/flashsale"}
            className=" bg-[#EE4D2D] flex items-center justify-between md:p-4 p-2"
          >
            <div className="flex items-center">
              <h1 className="uppercase font-bold md:text-[28px] text-[12px] text-white">
                Flash Sale
              </h1>
              <Image
                loading="lazy"
                src={`/assets/icons/flash.svg`}
                width={50}
                height={50}
                alt="wall"
                className="md:w-[50px] w-[20px] md:h-[50px] h-[20px] object-cover"
              />
            </div>
            <div className="flex items-center">
              {/* Days */}
              <div className="bg-white text-[#3D3D3D] font-bold md:w-[50px] w-[28px] md:h-[50px] h-[28px] flex items-center justify-center rounded-md">
                <p className="md:text-[28px] text-[14px] font-bold">
                  {String(timeLeft.days).padStart(2, "0")}
                </p>
              </div>
              <p className="mx-2 text-[#3D3D3D] font-bold md:text-[28px] text-[14px]">
                :
              </p>
              {/* Hours */}
              <div className="bg-white text-[#3D3D3D] font-bold md:w-[50px] w-[28px] md:h-[50px] h-[28px] flex items-center justify-center rounded-md">
                <p className="md:text-[28px] text-[14px] font-bold">
                  {String(timeLeft.hours).padStart(2, "0")}
                </p>
              </div>
              <p className="mx-2 text-[#3D3D3D] font-bold md:text-[28px] text-[14px]">
                :
              </p>
              {/* Minutes */}
              <div className="bg-white text-[#3D3D3D] font-bold md:w-[50px] w-[28px] md:h-[50px] h-[28px] flex items-center justify-center rounded-md">
                <p className="md:text-[28px] text-[14px] font-bold">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </p>
              </div>
              <p className="mx-2 text-[#3D3D3D] font-bold md:text-[28px] text-[14px]">
                :
              </p>
              {/* Seconds */}
              <div className="bg-white text-[#3D3D3D] font-bold md:w-[50px] w-[28px] md:h-[50px] h-[28px] flex items-center justify-center rounded-md">
                <p className="md:text-[28px] text-[14px] font-bold">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
