import Socmed from "@/components/home/socmed";
import CallculatorWallpaper from "@/components/wallpaper/calculatorwallpaper";
import Clearance from "@/components/wallpaper/clearance";
import Hero from "@/components/wallpaper/hero";
import Wallpapers from "@/components/wallpaper/wallpapers";
import { getData } from "../utils/fetching";
import { WallpaperProps } from "@/types/wallpaper";
import { HomepageProps } from "@/types/homepage";
import ContainerWallpaper from "@/components/wallpaper/containerWallpaper";
import { SubCategoryProps } from "@/types/subCategories";
import { ProductsProps, ProductsPropsDaum } from "@/types/products";

export default async function Page() {
  const productsClearance: ProductsProps = await getData({
    path: `products`,
    params: {
      populate: "discount,images",
    },
  });

  const productsClearanceResult: ProductsPropsDaum[] =
    productsClearance.data.filter((item) => item.attributes.discount);

  const wallpaper: WallpaperProps = await getData({
    path: `wallpaper`,
    params: {
      populate: "banners",
    },
  });

  const homepage: HomepageProps = await getData({
    path: `homepage`,
    params: {
      populate: "banners,socmed,socmed.logo",
    },
  });

  const subCategories: SubCategoryProps = await getData({
    path: `sub-categories`,
    params: {
      populate: "wallpaper_items,wallpaper_items.thumbnail",
      "sort[0]": "createdAt:desc",
    },
  });

  return (
    <main className="mt-[100px]">
      <Hero wallpaper={wallpaper} />
      <Clearance productsClearance={productsClearanceResult} />
      <ContainerWallpaper subCategories={subCategories} />
      <CallculatorWallpaper wallpaper={wallpaper} />
      <Socmed homepage={homepage} />
    </main>
  );
}
