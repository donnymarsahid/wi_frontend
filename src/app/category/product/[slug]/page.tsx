import { getData } from "@/app/utils/fetching";
import List from "@/components/listProduct/detail";
import { BrandsProps } from "@/types/brands";
import { ProductsProps } from "@/types/products";
import { WallpaperByGeneralProps } from "@/types/wallpaperByGeneral";
import { Metadata } from "next";

type Slug = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Slug): Promise<Metadata> {
  const brands: BrandsProps = await getData({
    path: `brands`,
    params: {
      populate:
        "seo",
      "filters[slug][$eq]": params.slug,
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
      title: "Wallpaper Indonesia | Pusat Belanja Online Material Interior di Indonesia",
      description: "Wallpaper Indonesia merupakan pusat pembelanjaan online untuk material interior mulai dari Wallpaper, Wallfoam 3D, Vinyl Flooring, Parquet Flooring, Gordyn, Blind dan Carpet Tile. Tersedia dalam beragam motif, warna, dan merek yang sesuai dengan kebutuhan Anda.",
    };
  }
}

export default async function SlugProducts({ params }: Slug) {
  const brands: BrandsProps = await getData({
    path: `brands`,
    params: {
      populate:
        "products,products.discount,products.images,sub_categories,sub_categories.categories,products.brands,products.brands.discount,products.wallpaper_by_colors,products.wallpaper_by_styles,products.wallpaper_by_designers",
      "filters[slug][$eq]": params.slug,
    },
  });

  const wallpaper_by_colors: WallpaperByGeneralProps = await getData({
    path: `wallpaper-by-colors`,
  });
  const wallpaper_by_styles: WallpaperByGeneralProps = await getData({
    path: `wallpaper-by-styles`,
  });
  const wallpaper_by_designers: WallpaperByGeneralProps = await getData({
    path: `wallpaper-by-designers`,
  });

  return (
    <>
      <main className="mt-[100px] md:mt-[200px] lg:mt-[100px]">
        <List
          brands={brands}
          wallpaper_by_colors={wallpaper_by_colors}
          wallpaper_by_styles={wallpaper_by_styles}
          wallpaper_by_designers={wallpaper_by_designers}
        />
      </main>
    </>
  );
}
