import { getData } from "@/app/utils/fetching";
import Content from "@/components/products/content";
import { BrandsProps } from "@/types/brands";
import { ProductsProps } from "@/types/products";
import { WallpaperByGeneralProps } from "@/types/wallpaperByGeneral";

type tParams = Promise<{
  page: string;
  category: string;
  subcategory: string;
  q: string;
}>;

export default async function Products(props: { searchParams: tParams }) {
  const products: ProductsProps = await getData({
    path: `products`,
    params: {
      populate:
        "images,brands,brands.discount,brands.sub_categories,brands.sub_categories.categories",

      "filters[available][$eq]": "true",
      "filters[title][$containsi]": (await props.searchParams).q,
    },
  });

  // Awalnya set filteredData sebagai semua data produk
  let filteredData = products.data;

  return (
    <>
      <main className="mt-[120px] md:mt-[200px] lg:mt-[120px]">
        <Content data={filteredData} query={await props.searchParams} />
      </main>
    </>
  );
}
