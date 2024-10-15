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
        "images,brands,brands.discount,wallpaper_by_colors,wallpaper_by_designers,wallpaper_by_styles,brands.sub_categories,brands.sub_categories.categories",
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

  // Awalnya set filteredData sebagai semua data produk
  let filteredData = products.data;

  // Jika ada styleFilter, lakukan filter tambahan
  if (searchParams.styleFilter) {
    filteredData = products.data.filter((itemData) => {
      const brand = itemData?.attributes?.brands?.data[0];
      const subCategory = brand?.attributes?.sub_categories?.data[0];
      const category = subCategory?.attributes?.categories?.data[0];

      // Kembalikan true jika kategori adalah "wallpaper"
      return category?.attributes?.keyPageCondition === "wallpaper";
    });
  }

  return (
    <>
      <main className="mt-[120px] md:mt-[200px] lg:mt-[120px]">
        <Content data={filteredData} query={searchParams} />
      </main>
    </>
  );
}
