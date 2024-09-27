import Content from "@/components/howToShop/content";
import { getData } from "../utils/fetching";
import { HowToShopProps } from "@/types/howToShop";

type Slug = { params: { slug: string } };

export default async function SlugProducts({ params }: Slug) {
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
