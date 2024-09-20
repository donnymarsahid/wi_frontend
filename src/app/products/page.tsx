import { getData } from "@/app/utils/fetching";
import Content from "@/components/products/content";
import { ProductsProps } from "@/types/products";

type ProductsPageProps = {
  searchParams: {
    page: string;
    category: string;
    subcategory: string;
    q: string;
  };
};

export default async function Products({ searchParams }: ProductsPageProps) {
  const products: ProductsProps = await getData({
    path: `products`,
    params: {
      populate: "discount,images",
      "filters[title][$containsi]": searchParams.q,
    },
  });
  return (
    <>
      <main className="mt-[120px]">
        <Content data={products} query={searchParams.q} />
      </main>
    </>
  );
}
