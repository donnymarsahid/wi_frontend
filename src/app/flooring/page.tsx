import Socmed from "@/components/home/socmed";
import Hero from "@/components/flooring/hero";
import Floors from "@/components/flooring/floors";
import Categories from "@/components/flooring/categories";
import Accessories from "@/components/flooring/accessories";
import { FlooringProps } from "@/types/flooring";
import { getData } from "../utils/fetching";

export default async function Page() {
  const dataFlooring = [
    {
      title: "Lantai Vinyl",
      floors: [
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
      title: "Lantai Vinyl Sticker",
      floors: [
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
      title: "Lantai SPC (Click)",
      floors: [
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

  const flooring: FlooringProps = await getData({
    path: `flooring`,
    params: {
      populate: "banners",
    },
  });
  return (
    <main className="mt-[100px]">
      <Hero flooring={flooring} />
      <Categories />
      {dataFlooring.map((item, index) => (
        <Floors data={item} key={index} />
      ))}
      <Accessories />
      <Socmed />
    </main>
  );
}
