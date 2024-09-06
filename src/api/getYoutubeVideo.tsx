// pages/api/getYoutubeVideo.js

import { YOUTUBE_API_KEY } from "@/app/utils/constans";

export default async function handler(req: any, res: any) {
  const { videoId } = req.query;

  const apiKey = YOUTUBE_API_KEY;
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
}
