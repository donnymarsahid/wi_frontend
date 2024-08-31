import Socmed from "@/components/home/socmed";
import Hero from "@/components/flooring/hero";
import Floors from "@/components/flooring/floors";
import Categories from "@/components/flooring/categories";
import Accessories from "@/components/flooring/accessories";

export default function Page() {
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
  return (
    <main className="mt-[100px]">
      <Hero />
      <Categories />
      {dataFlooring.map((item, index) => (
        <Floors data={item} key={index} />
      ))}
      <Accessories />
      <Socmed />
    </main>
  );
}
