import { getData } from "@/app/utils/fetching";
import List from "@/components/listProduct/detail";
import { BrandsProps } from "@/types/brands";
import { ProductsProps } from "@/types/products";

type Slug = {
  params: {
    slug: string;
  };
};

export default async function SlugProducts({ params }: Slug) {
  const brands: BrandsProps = await getData({
    path: `brands`,
    params: {
      populate: "products,products.discount,products.images",
    },
  });

  return (
    <>
      <main className="mt-[100px]">
        <List brands={brands} />
      </main>
    </>
  );
}
