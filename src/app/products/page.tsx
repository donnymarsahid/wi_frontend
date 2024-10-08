import { getData } from "@/app/utils/fetching";
import Content from "@/components/products/content";
import { ProductsProps } from "@/types/products";

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
        "images,brands,brands.discount,wallpaper_by_colors,wallpaper_by_designers,wallpaper_by_styles",
      "filters[$or][0][wallpaper_by_colors][slug][$eq]":
        searchParams.styleFilter,
      "filters[$or][1][wallpaper_by_designers][slug][$eq]":
        searchParams.styleFilter,
      "filters[$or][2][wallpaper_by_styles][slug][$eq]":
        searchParams.styleFilter,
      "filters[available][$eq]": "true",
      "filters[title][$containsi]": searchParams.q,
    },
  });
  return (
    <>
      <main className="mt-[120px]">
        <Content data={products} query={searchParams} />
      </main>
    </>
  );
}
