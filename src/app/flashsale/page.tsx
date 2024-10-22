import { getData } from "@/app/utils/fetching";
import Content from "@/components/flashsale/content";
import { FlashSaleProps } from "@/types/flashsale";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const flashsale: FlashSaleProps = await getData({
    path: `flashsale`,
    params: {
      populate:
        "seo",
      "filters[active][$eq]": "true",
    },
  });
  try {
    const { seo } = flashsale.data.attributes;

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
      title: "Wallpaper Indonesia | Pusat Belanja Online Material Interior di Indonesia",
      description: "Wallpaper Indonesia merupakan pusat pembelanjaan online untuk material interior mulai dari Wallpaper, Wallfoam 3D, Vinyl Flooring, Parquet Flooring, Gordyn, Blind dan Carpet Tile. Tersedia dalam beragam motif, warna, dan merek yang sesuai dengan kebutuhan Anda.",
    };
  }
}

export default async function Products() {
  const flashsale: FlashSaleProps = await getData({
    path: `flashsale`,
    params: {
      populate:
        "products,products.images,products.brands,products.brands.discount",
      "filters[active][$eq]": "true",
    },
  });

  return (
    <>
      <main className="mt-[120px] md:mt-[200px] lg:mt-[120px]">
        <Content {...flashsale} />
      </main>
    </>
  );
}
