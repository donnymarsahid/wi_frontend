import { getData } from "@/app/utils/fetching";
import Detail from "@/components/products/detail";
import { FlashSaleProps } from "@/types/flashsale";
import { ProductsProps } from "@/types/products";
import { Metadata } from "next";

type tParams = Promise<{ slug: string }>;

// export async function generateMetadata(props: {
//   params: tParams;
// }): Promise<Metadata> {
//   const slug = (await props.params).slug;
//   const products: ProductsProps = await getData({
//     path: `products`,
//     params: {
//       populate: "seo",
//       "filters[slug][$eq]": slug,
//     },
//   });
//   try {
//     const { seo } = products.data[0].attributes;

//     // const previousImages = (await parent).openGraph?.images || [];
//     return {
//       title: seo.title,
//       description: seo.description,
//       viewport: seo.viewport,
//       keywords: seo.keywords,
//       robots: seo.robots,
//     };
//   } catch (error) {
//     return {
//       title:
//         "Wallpaper Indonesia | Pusat Belanja Online Material Interior di Indonesia",
//       description:
//         "Wallpaper Indonesia merupakan pusat pembelanjaan online untuk material interior mulai dari Wallpaper, Wallfoam 3D, Vinyl Flooring, Parquet Flooring, Gordyn, Blind dan Carpet Tile. Tersedia dalam beragam motif, warna, dan merek yang sesuai dengan kebutuhan Anda.",
//     };
//   }
// }

export default async function SlugProducts(props: { params: tParams }) {
  const slug = (await props.params).slug;
  const products: ProductsProps = await getData({
    path: `products`,
    params: {
      populate:
        "images,brands,brands.products,brands.products.images,brands.products.discount,brands.products.brands,brands.products.brands.discount,brands.discount,brands.sub_categories,brands.categories,brands.sub_categories.categories,wallpaper_by_colors,wallpaper_by_styles,wallpaper_by_designers",
      "sort[0]": "date:desc",
      "filters[slug][$eq]": slug,
      "fields[0]": "title",
      "fields[1]": "brands",
      "fields[2]": "images",
      "fields[3]": "desc",
    },
  });

  const flashsale: FlashSaleProps = await getData({
    path: `flashsale`,
    params: {
      populate: "products",
      "filters[active][$eq]": "true",
      "fields[0]": "expiry_date",
      "fields[1]": "products",
    },
  });

  return (
    <>
      <main className="mt-[100px] md:mt-[200px] lg:mt-[100px]">
        <Detail data={products.data[0]} flashsale={flashsale} />
      </main>
    </>
  );
}
