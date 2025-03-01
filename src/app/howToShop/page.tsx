import Content from "@/components/howToShop/content";
import { getData } from "../utils/fetching";
import { HowToShopProps } from "@/types/howToShop";

export default async function SlugProducts() {
  const howToShop: HowToShopProps = await getData({
    path: `how-to-shop`,
    params: {
      populate: "portfolios,banners",
    },
  });
  return (
    <>
      <main className="mt-[120px]">
        <Content data={howToShop} />
      </main>
    </>
  );
}
