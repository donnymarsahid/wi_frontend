import Socmed from "@/components/home/socmed";
import CallculatorWallpaper from "@/components/wallpaper/calculatorwallpaper";
import Clearance from "@/components/wallpaper/clearance";
import Hero from "@/components/wallpaper/hero";
import Wallpapers from "@/components/wallpaper/wallpapers";
import { getData } from "../utils/fetching";
import { WallpaperProps } from "@/types/wallpaper";

export default async function Page() {
  const dataWallpaper = [
    {
      title: "Wallpaper by Style",
      wallpapers: [
        {
          url: "/assets/dummy/wp-style-1.png",
          title: "Wallpaper",
        },
        {
          url: "/assets/dummy/wp-style-2.png",
          title: "Lantai Vinyl & SPC",
        },
        {
          url: "/assets/dummy/wp-style-1.png",
          title: "Wallpanel",
        },
        {
          url: "/assets/dummy/wp-style-2.png",
          title: "Karpet & Rumput Sintetis",
        },
        {
          url: "/assets/dummy/wp-style-1.png",
          title: "Wallpaper",
        },
        {
          url: "/assets/dummy/wp-style-2.png",
          title: "Lantai Vinyl & SPC",
        },
        {
          url: "/assets/dummy/wp-style-1.png",
          title: "Wallpanel",
        },
        {
          url: "/assets/dummy/wp-style-2.png",
          title: "Karpet & Rumput Sintetis",
        },
      ],
    },
    {
      title: "Wallpaper by Color",
      wallpapers: [
        {
          url: "/assets/dummy/wp-style-1.png",
          title: "Wallpaper",
        },
        {
          url: "/assets/dummy/wp-style-2.png",
          title: "Lantai Vinyl & SPC",
        },
        {
          url: "/assets/dummy/wp-style-1.png",
          title: "Wallpanel",
        },
        {
          url: "/assets/dummy/wp-style-2.png",
          title: "Karpet & Rumput Sintetis",
        },
        {
          url: "/assets/dummy/wp-style-1.png",
          title: "Wallpaper",
        },
        {
          url: "/assets/dummy/wp-style-2.png",
          title: "Lantai Vinyl & SPC",
        },
        {
          url: "/assets/dummy/wp-style-1.png",
          title: "Wallpanel",
        },
        {
          url: "/assets/dummy/wp-style-2.png",
          title: "Karpet & Rumput Sintetis",
        },
      ],
    },
    {
      title: "Wallpaper by Designer",
      wallpapers: [
        {
          url: "/assets/dummy/wp-style-1.png",
          title: "Wallpaper",
        },
        {
          url: "/assets/dummy/wp-style-2.png",
          title: "Lantai Vinyl & SPC",
        },
        {
          url: "/assets/dummy/wp-style-1.png",
          title: "Wallpanel",
        },
        {
          url: "/assets/dummy/wp-style-2.png",
          title: "Karpet & Rumput Sintetis",
        },
        {
          url: "/assets/dummy/wp-style-1.png",
          title: "Wallpaper",
        },
        {
          url: "/assets/dummy/wp-style-2.png",
          title: "Lantai Vinyl & SPC",
        },
        {
          url: "/assets/dummy/wp-style-1.png",
          title: "Wallpanel",
        },
        {
          url: "/assets/dummy/wp-style-2.png",
          title: "Karpet & Rumput Sintetis",
        },
      ],
    },
  ];

  const wallpaper: WallpaperProps = await getData({
    path: `wallpaper`,
    params: {
      populate: "banners",
    },
  });

  return (
    <main className="mt-[100px]">
      <Hero wallpaper={wallpaper} />
      <Clearance />
      {dataWallpaper.map((item, index) => (
        <Wallpapers data={item} key={index} />
      ))}
      <CallculatorWallpaper />
      <Socmed />
    </main>
  );
}
