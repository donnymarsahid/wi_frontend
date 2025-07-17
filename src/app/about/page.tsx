import Content from "@/components/about.tsx/content";
import { getData } from "../utils/fetching";
import { AboutProps } from "@/types/about";
import { ClientProps } from "@/types/client";
import { FooterProps } from "@/types/footer";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const about: AboutProps = await getData({
    path: "about?populate=seo",
  });

  try {
    const { seo } = about.data?.attributes;

    // const previousImages = (await parent).openGraph?.images || [];
    return {
      title: seo.title,
      description: seo.description,
      viewport: seo.viewport,
      keywords: seo.keywords,
      robots: seo.robots,
    };
  } catch (error) {
    return {
      title:
        "Wallpaper Indonesia | Pusat Belanja Online Material Interior di Indonesia",
      description:
        "Wallpaper Indonesia merupakan pusat pembelanjaan online untuk material interior mulai dari Wallpaper, Wallfoam 3D, Vinyl Flooring, Parquet Flooring, Gordyn, Blind dan Carpet Tile. Tersedia dalam beragam motif, warna, dan merek yang sesuai dengan kebutuhan Anda.",
    };
  }
}

export default async function SlugProducts() {
  const about: AboutProps = await getData({
    path: `about`,
    params: {
      populate: "portfolios,banners",
    },
  });

  const clients: ClientProps = await getData({
    path: `clients`,
    params: {
      populate: "logo",
      "sort[0]": "createdAt:desc",
    },
  });

  const footer: FooterProps = await getData({
    path: `footer`,
  });

  return (
    <>
      <main className="mt-[120px] md:mt-[200px] lg:mt-[120px]">
        <Content data={about} clients={clients} footer={footer} />
      </main>
    </>
  );
}
