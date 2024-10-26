"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import CarouselYoutube from "../atoms/carouselyoutube";

export default function VideoAndImplementation() {
  const [videoDatas, setVideoDatas] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShortsVideos() {
      try {
        // Fetch dari API route Next.js, bukan langsung ke YouTube
        const response = await fetch("/api/fetchYouTubeVideos");
        const data = await response.json();

        setVideoDatas(data.videos || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchShortsVideos();
  }, []);

  return (
    <div className={`md:mt-10 mt-2 ${cx(poppins, poppins.className)}`}>
      <div className="container mx-auto">
        <div className="md:mx-10 mx-4">
          <div className="flex items-start flex-col">
            <div className="flex items-center">
              <Image
                loading="lazy"
                src={"/assets/icons/youtube.svg"}
                width={55}
                height={55}
                className="md:w-[55px] w-[45px]"
                alt="ic-yt"
              />
              <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
                Video Product & Pemasangan
              </h1>
            </div>
            <div className="md:h-[3px] h-[1px] lg:w-[300px] md:w-[500px] w-[300px] bg-[#20D3B6] text-center"></div>
            <div className="w-full mt-6">
              {loading ? (
                <p>Memuat Video...</p>
              ) : (
                <CarouselYoutube data={videoDatas} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
