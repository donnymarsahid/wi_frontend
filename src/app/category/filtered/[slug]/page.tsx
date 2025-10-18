import { getData } from "@/app/utils/fetching";
import List from "@/components/listProductFiltered/detail";
import { decodeText, restoreAmpersand } from "@/lib/utils";
import { BrandsProps } from "@/types/brands";
import { ProductsProps } from "@/types/products";
import { WallpaperByGeneralProps } from "@/types/wallpaperByGeneral";
import { Metadata } from "next";

type tParams = Promise<{ slug: string }>;
type tSecondParams = Promise<{
  category: string;
}>;

export async function generateMetadata(props: {
  params: tParams;
}): Promise<Metadata> {
  const slug = (await props.params).slug;
  const brands: BrandsProps = await getData({
    path: `brands`,
    params: {
      populate: "seo",
      "filters[slug][$eq]": slug,
    },
  });
  try {
    const { seo } = brands.data[0].attributes;

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

export default async function SlugProducts(props: {
  params: tParams;
  searchParams: tSecondParams;
}) {
  const slug = (await props.params).slug;
  const category = (await props.searchParams).category;
  return (
    <>
      <main className="mt-[100px] md:mt-[200px] lg:mt-[100px]">
        <List category={category} slug={slug} />
      </main>
    </>
  );
}
