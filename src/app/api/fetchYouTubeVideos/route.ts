import NodeCache from "node-cache";
import { YOUTUBE_API_KEY, YOUTUBE_CHANNEL } from "@/app/utils/constans";

const cache = new NodeCache({ stdTTL: 600 }); // Cache untuk 10 menit

export async function GET(request: Request) {
  const cacheKey = "youtubeShorts";
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return new Response(JSON.stringify({ videos: cachedData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?channelId=${YOUTUBE_CHANNEL}&part=snippet&order=date&maxResults=15&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      const videoIds = data.items.map((item: any) => item.id.videoId).join(",");

      const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`;

      const detailsResponse = await fetch(detailsUrl);

      if (detailsResponse.ok) {
        const detailsData = await detailsResponse.json();

        const videos = detailsData.items
          .filter((item: any) => {
            const duration = item.contentDetails.duration;
            // Convert ISO 8601 duration to seconds
            const seconds = parseDurationToSeconds(duration);
            return seconds <= 60; // Filter for videos shorter than or equal to 60 seconds
          })
          .map((item: any) => {
            const videoId = item.id;
            const title = item.snippet.title;
            const views = item.statistics.viewCount || 0;

            return { videoId, title, views };
          });

        cache.set(cacheKey, videos); // Simpan data ke cache

        return new Response(
          JSON.stringify({
            videos,
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        const errorText = await detailsResponse.text();
        console.error(`Failed to fetch video details: ${errorText}`); // Log the error response
        return new Response(
          JSON.stringify({
            err: true,
            msg: "Failed to fetch video details",
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } else {
      const errorText = await response.text();
      console.error(`Failed to fetch video list: ${errorText}`); // Log the error response
      return new Response(
        JSON.stringify({
          err: true,
          msg: "Failed to fetch video list",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new Response(
      JSON.stringify({
        err: true,
        msg: "An error occurred during the fetch operation",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// Helper function to convert ISO 8601 duration to seconds
function parseDurationToSeconds(duration: string): number {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return 0;

  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const seconds = match[3] ? parseInt(match[3], 10) : 0;

  return hours * 3600 + minutes * 60 + seconds;
}
