import Image from "next/image";
import React, { useState } from "react";

const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="video-container rounded-[10px] h-[350px]">
      {!isPlaying ? (
        <div
          onClick={() => setIsPlaying(true)}
          className="relative flex justify-center items-center w-full h-full cursor-pointer"
        >
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            placeholder="blur"
            blurDataURL={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg?w=30&q=10`} // Placeholder low-res
            layout="fill"
            objectFit="cover"
            alt="YouTube thumbnail"
            className="rounded-[10px]"
          />
          <div className="absolute text-white text-4xl  w-full h-full rounded-[10px] bg-black bg-opacity-10">
            <div className="flex justify-center items-center h-full">▶</div>
          </div>
        </div>
      ) : (
        <iframe
          width="100%"
          height="350px"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          className="rounded-[10px]"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default YouTubeEmbed;
