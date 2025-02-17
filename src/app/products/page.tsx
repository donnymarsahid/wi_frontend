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
        "images,brands,brands.discount,wallpaper_by_colors,wallpaper_by_designers,wallpaper_by_styles,brands.sub_categories,brands.sub_categories.categories",
      "filters[$or][0][wallpaper_by_colors][slug][$eq]":
        searchParams.styleFilter.split("--")[0],
      "filters[$or][1][wallpaper_by_designers][slug][$eq]":
        searchParams.styleFilter.split("--")[0],
      "filters[$or][2][wallpaper_by_styles][slug][$eq]":
        searchParams.styleFilter.split("--")[0],
      "filters[available][$eq]": "true",
      "filters[title][$containsi]": searchParams.q,
    },
  });

  // Awalnya set filteredData sebagai semua data produk
  let filteredData = products.data;

  // Jika ada styleFilter, lakukan filter tambahan
  if (searchParams.styleFilter.split("--")[0]) {
    filteredData = products.data.filter((itemData) => {
      const brand = itemData?.attributes?.brands?.data[0];
      const subCategory = brand?.attributes?.sub_categories?.data[0];
      const category = subCategory?.attributes?.categories?.data[0];

      // Kembalikan true jika kategori adalah "wallpaper"
      return category?.attributes?.keyPageCondition === "wallpaper";
    });
  }

  const brands: BrandsProps = await getData({
    path: `brands`,
    params: {
      populate:
        "products,products.discount,products.images,sub_categories,sub_categories.categories,products.brands,products.brands.discount,products.wallpaper_by_colors,products.wallpaper_by_styles,products.wallpaper_by_designers",
      "filters[slug][$eq]": "wjefhiwhfiuehwaiufhawuiefh",
      "sort[0]": "date:desc",
    },
  });

  const wallpaper_by_colors: WallpaperByGeneralProps = await getData({
    path: `wallpaper-by-colors`,
    params: {
      populate:
        "products,products.brands,products.wallpaper_by_designers,products.wallpaper_by_styles,products.wallpaper_by_colors",
    },
  });
  const wallpaper_by_styles: WallpaperByGeneralProps = await getData({
    path: `wallpaper-by-styles`,
    params: {
      populate:
        "products,products.brands,products.wallpaper_by_designers,products.wallpaper_by_colors,products.wallpaper_by_styles",
    },
  });
  const wallpaper_by_designers: WallpaperByGeneralProps = await getData({
    path: `wallpaper-by-designers`,
    params: {
      populate:
        "products,products.brands,products.wallpaper_by_styles,products.wallpaper_by_colors,products.wallpaper_by_designers",
    },
  });

  return (
    <>
      <main className="mt-[120px] md:mt-[200px] lg:mt-[120px]">
        <Content
          brands={brands}
          wallpaper_by_colors={wallpaper_by_colors}
          wallpaper_by_styles={wallpaper_by_styles}
          wallpaper_by_designers={wallpaper_by_designers}
          slug={"whqwdhqwhdjqwhkdqwhkjdhlk"}
          data={filteredData}
          query={searchParams}
        />
      </main>
    </>
  );
}
