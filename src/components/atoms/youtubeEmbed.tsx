import React from "react";

const YouTubeEmbed = ({ videoId }: any) => {
  return (
    <div className="video-container rounded-[15px]">
      <iframe
        width="100%"
        height="500px"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubeEmbed;
