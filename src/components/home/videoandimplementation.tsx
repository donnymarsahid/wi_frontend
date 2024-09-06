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
import CarouselYoutube from "../atoms/carouselyoutube";

export default function VideoAndImplementation({ videoId }: any) {
  const [videoDatas, setVideoDatas] = useState<any>([]);
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  useEffect(() => {
    async function fetchShortsVideos() {
      try {
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?channelId=UCr4gIXPtWl7lOnKqQOYfHKQ&type=video&key=${YOUTUBE_API_KEY}&maxResults=30&order=date`;
        const response = await fetch(apiUrl, {
          next: {
            revalidate: 60,
          },
        });
        const data = await response.json();

        if (response.ok) {
          // Ambil ID video dari hasil search
          const videoIds = data.items
            .map((item: any) => item.id.videoId)
            .join(",");

          // Ambil detail video termasuk durasinya
          const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
          const detailsResponse = await fetch(detailsUrl);
          const detailsData = await detailsResponse.json();

          // Fungsi untuk mengonversi durasi ISO 8601 ke dalam detik
          const parseDuration = (duration: any) => {
            const match = duration.match(/PT(?:([0-9]+)M)?(?:([0-9]+)S)?/);
            if (match) {
              const minutes = parseInt(match[1] || "0", 10);
              const seconds = parseInt(match[2] || "0", 10);
              return minutes * 60 + seconds;
            }
            return 0;
          };

          // Filter video yang durasinya di bawah 60 detik (Shorts)
          const shortsVideos = detailsData.items.filter(
            (video: any) => parseDuration(video.contentDetails.duration) < 60
          );

          // Set hasil yang sudah difilter ke state
          setVideoDatas(shortsVideos);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading ke false setelah selesai fetch
      }
    }

    fetchShortsVideos();
  }, []);

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
                {loading ? (
                  <p>Memuat Video Reels...</p>
                ) : (
                  <CarouselYoutube data={videoDatas} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
