import { getData } from "@/app/utils/fetching";
import List from "@/components/listProductFiltered/detail";
import { BrandsProps } from "@/types/brands";
import { ProductsProps } from "@/types/products";
import { WallpaperByGeneralProps } from "@/types/wallpaperByGeneral";
import { Metadata } from "next";

type tParams = Promise<{ slug: string }>;
type tSecondParams = Promise<{
  page: string;
  title: string;
  colors: string;
  styles: string;
  designers: string;
  key: string;
  multiple: string;
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
  const page = (await props.searchParams).page;
  const colors = (await props.searchParams).colors?.split(",");
  const styles = (await props.searchParams).styles?.split(",");
  const designers = (await props.searchParams).designers?.split(",");

  const slugs = (await props.searchParams).multiple;
  let multiple: string[] = [];

  // slugs bisa undefined/null, jadi cek dulu
  if (slugs) {
    multiple = slugs.split(",");
  }

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
      "pagination[page]": "1",
      "pagination[pageSize]": "9999",
    };
  }

  multiple.forEach((item, index) => {
    queryProducts[
      `filters[${categoriesMap[category]}][title][[$in][${index}]`
    ] = multiple[index];
  });

  // Colors
  for (let i = 0; i < colors?.length; i++) {
    queryProducts[`filters[wallpaper_by_colors][title][[$in][${i}]`] =
      colors[i];
  }
  // Styles
  for (let i = 0; i < styles?.length; i++) {
    queryProducts[`filters[wallpaper_by_styles][title][[$in][${i}]`] =
      styles[i];
  }
  // Designers
  for (let i = 0; i < designers?.length; i++) {
    queryProducts[`filters[wallpaper_by_designers][title][[$in][${i}]`] =
      designers[i];
  }

  const products: ProductsProps = await getData({
    path: `products`,
    params: queryProducts,
  });

  console.log(products.data.length, "products length");

  return (
    <>
      <main className="mt-[100px] md:mt-[200px] lg:mt-[100px]">
        <List
          searchParams={await props.searchParams}
          products={products}
          slug={slug}
        />
      </main>
    </>
  );
}
