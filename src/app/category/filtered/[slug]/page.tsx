import { getData } from "@/app/utils/fetching";
import List from "@/components/listProductFiltered/detail";
import { BrandsProps } from "@/types/brands";
import { ProductsProps } from "@/types/products";
import { WallpaperByGeneralProps } from "@/types/wallpaperByGeneral";
import { Metadata } from "next";

type tParams = Promise<{ slug: string }>;

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

export default async function SlugProducts(props: { params: tParams }) {
  const slug = (await props.params).slug;

  let queryProducts = null;

  const [slugValue, category] = slug.split("--") ?? [];

  const categoriesMap: Record<string, string> = {
    "wallpaper-by-style": "wallpaper_by_styles",
    "wallpaper-by-color": "wallpaper_by_colors",
    "wallpaper-by-designer": "wallpaper_by_designers",
  };

  if (categoriesMap[category]) {
    queryProducts = {
      populate: `discount,images,brands,brands.discount,brands.categories,wallpaper_by_styles,wallpaper_by_colors,wallpaper_by_designers`,
      "sort[0]": "date:desc",
      [`filters[${categoriesMap[category]}][slug][$eq]`]: slugValue,
      "filters[brands][categories][slug][$eq]": "wallpaper",
      "pagination[pageSize]": "1000",
    };
  }

  const products: ProductsProps = await getData({
    path: `products`,
    params: queryProducts,
  });

  const queryWallpaperBy = {
    populate: "products,products.brands",
    "fields[0]": "title",
    "fields[1]": "products",
  };

  const wallpaper_by_colors: WallpaperByGeneralProps = await getData({
    path: `wallpaper-by-colors`,
    params: queryWallpaperBy,
    revalidate: 0,
  });
  const wallpaper_by_styles: WallpaperByGeneralProps = await getData({
    path: `wallpaper-by-styles`,
    params: queryWallpaperBy,
    revalidate: 0,
  });
  const wallpaper_by_designers: WallpaperByGeneralProps = await getData({
    path: `wallpaper-by-designers`,
    params: queryWallpaperBy,
    revalidate: 0,
  });

  return (
    <>
      <main className="mt-[100px] md:mt-[200px] lg:mt-[100px]">
        <List
          products={products}
          wallpaper_by_colors={wallpaper_by_colors}
          wallpaper_by_styles={wallpaper_by_styles}
          wallpaper_by_designers={wallpaper_by_designers}
          slug={slug}
        />
      </main>
    </>
  );
}
