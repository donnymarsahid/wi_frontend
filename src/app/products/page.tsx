import { getData } from "@/app/utils/fetching";
import Content from "@/components/products/content";
import { BrandsProps } from "@/types/brands";
import { ProductsProps } from "@/types/products";
import { WallpaperByGeneralProps } from "@/types/wallpaperByGeneral";

type ProductsPageProps = {
  searchParams: {
    page: string;
    category: string;
    subcategory: string;
    q: string;
    styleFilter: string;
  };
};

export default async function Products({ searchParams }: ProductsPageProps) {
  const products: ProductsProps = await getData({
    path: `products`,
    params: {
      populate:
        "images,brands,brands.discount,brands.sub_categories,brands.sub_categories.categories",

      "filters[available][$eq]": "true",
      "filters[title][$containsi]": searchParams.q,
    },
  });

  // Awalnya set filteredData sebagai semua data produk
  let filteredData = products.data;

  return (
    <>
      <main className="mt-[120px] md:mt-[200px] lg:mt-[120px]">
        <Content data={filteredData} query={searchParams} />
      </main>
    </>
  );
}
