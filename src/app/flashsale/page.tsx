import { getData } from "@/app/utils/fetching";
import Content from "@/components/flashsale/content";
import { FlashSaleProps } from "@/types/flashsale";

export default async function Products() {
  const flashsale: FlashSaleProps = await getData({
    path: `flashsale`,
    params: {
      populate:
        "products,products.images,products.brands,products.brands.discount",
      "filters[active][$eq]": "true",
    },
  });

  return (
    <>
      <main className="mt-[120px] md:mt-[200px] lg:mt-[120px]">
        <Content {...flashsale} />
      </main>
    </>
  );
}
