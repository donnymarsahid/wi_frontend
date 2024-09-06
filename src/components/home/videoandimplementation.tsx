"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import CarouselBannerPromoProduct from "../atoms/carouselbannerpromoproduct";
import YouTubeEmbed from "../atoms/youtubeEmbed";
import { YOUTUBE_API_KEY } from "@/app/utils/constans";
import Link from "next/link";

export default function VideoAndImplementation({ videoId }: any) {
  const [videoDatas, setVideoDatas] = useState<any>([]);

  const wallpapers = [
    {
      url: "/assets/dummy/wallpaper-1.png",
      title: "Wallpaper",
    },
    {
      url: "/assets/dummy/wallpaper-1.png",
      title: "Lantai Vinyl & SPC",
    },
    {
      url: "/assets/dummy/wallpaper-1.png",
      title: "Wallpanel",
    },
    {
      url: "/assets/dummy/wallpaper-1.png",
      title: "Karpet & Rumput Sintetis",
    },
    {
      url: "/assets/dummy/wallpaper-1.png",
      title: "Tirai Blind",
    },
    {
      url: "/assets/dummy/wallpaper-1.png",
      title: "Decking Outdoor",
    },
  ];

  const services = [
    {
      url: "/assets/dummy/service-1.svg",
      desc: "Layanan dan informasi solutif perihal interior yg sedang kamu butuhkan",
    },
    {
      url: "/assets/dummy/service-2.svg",
      desc: "Tenaga pemasangan berpengalaman dan handal",
    },
    {
      url: "/assets/dummy/service-3.svg",
      desc: "Koleksi pilihan lengkap untuk memenuhi kebutuhan dekorasi interior / eksterior",
    },
  ];

  useEffect(() => {
    async function fetchVideoDetails() {
      try {
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCr4gIXPtWl7lOnKqQOYfHKQ&type=video&key=${YOUTUBE_API_KEY}&maxResults=50&order=date`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
          // Fungsi untuk mengonversi durasi ISO 8601 ke dalam detik
          const parseDuration = (duration: any) => {
            const match = duration.match(
              /PT(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+)S)?/
            );
            if (match) {
              const hours = parseInt(match[1] || "0", 10);
              const minutes = parseInt(match[2] || "0", 10);
              const seconds = parseInt(match[3] || "0", 10);
              return hours * 3600 + minutes * 60 + seconds;
            }
            return 0;
          };

          // Buat array of Promises untuk fetch video details
          const videoDetailsPromises = data.items.map(async (item: any) => {
            const detailsResponse = await fetch(
              `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&part=statistics&id=${item.id.videoId}&key=${YOUTUBE_API_KEY}`
            );
            const details = await detailsResponse.json();
            const duration = details.items[0].contentDetails.duration;

            // Periksa apakah durasi video kurang dari 60 detik
            const durationInSeconds = parseDuration(duration);
            if (durationInSeconds < 60) {
              return { ...item, views: details.items[0].statistics.viewCount };
            }
            return null;
          });

          // Tunggu semua Promises selesai
          const results = await Promise.all(videoDetailsPromises);

          // Filter out null values dan ambil 5 data awal
          const filteredResults = results
            .filter((result) => result !== null)
            .slice(0, 5);

          setVideoDatas(filteredResults);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchVideoDetails();
  }, []);

  const truncateTitle = (title: string) => {
    return title.length > 50 ? `${title.substring(0, 50)}...` : title;
  };

  return (
    <>
      <div className={`md:mt-10 mt-2 ${cx(poppins, poppins.className)}`}>
        <div className="container mx-auto">
          <div className="md:mx-10 mx-4">
            <div className="flex items-start flex-col">
              <div className="flex items-center">
                <Image
                  src={"assets/icons/youtube.svg"}
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
                <div>
                  <div className="grid gap-4 lg:grid-cols-5 grid-cols-3">
                    {videoDatas.map((item: any, index: any) => (
                      <Link href={""}>
                        <div
                          key={index}
                          className="relative mt-4 overflow-hidden cursor-pointer"
                        >
                          <YouTubeEmbed videoId={item.id.videoId} />
                          <h1 className="font-medium">
                            {truncateTitle(item.snippet.title)}
                          </h1>
                          <p className="text-xs font-medium">
                            {item.views} views
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
