import { getData } from "@/app/utils/fetching";
import Detail from "@/components/products/detail";
import { ProductsProps } from "@/types/products";

type Slug = { params: { slug: string } };

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

  return (
    <>
      <main className="mt-[120px]">
        <Detail data={products} />
      </main>
    </>
  );
}
