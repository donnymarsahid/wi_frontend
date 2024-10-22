import { getData } from "@/app/utils/fetching";
import Detail from "@/components/products/detail";
import { FlashSaleProps } from "@/types/flashsale";
import { ProductsProps } from "@/types/products";
import { Metadata } from "next";

type Slug = { params: { slug: string } };

export async function generateMetadata({ params }: Slug): Promise<Metadata> {
  const products: ProductsProps = await getData({
    path: `products`,
    params: {
      populate:
        "seo",
      "filters[slug][$eq]": params.slug,
    },
  });
  try {
    const { seo } = products.data[0].attributes;

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
  const products: ProductsProps = await getData({
    path: `products`,
    params: {
      populate:
        "images,brands,brands.products,brands.products.images,brands.products.discount,brands.discount,brands.sub_categories,brands.categories,brands.sub_categories.categories,wallpaper_by_colors,wallpaper_by_styles,wallpaper_by_designers",
      "sort[0]": "date:desc",
      "filters[slug][$eq]": params.slug,
    },
  });

  const flashsale: FlashSaleProps = await getData({
    path: `flashsale`,
    params: {
      populate: "products",
      "filters[active][$eq]": "true",
    },
  });

  return (
    <>
      <main className="mt-[120px]">
        <Detail data={products} flashsale={flashsale} />
      </main>
    </>
  );
}
