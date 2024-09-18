import { getData } from "@/app/utils/fetching";
import Accessories from "@/components/flooring/accessories";
import CategoriesFlooring from "@/components/flooring/categories";
import Floors from "@/components/flooring/floors";
import HeroFlooring from "@/components/flooring/hero";
import SocmedFlooring from "@/components/flooring/socmed";
import Socmed from "@/components/home/socmed";
import HeroOthers from "@/components/others/hero";
import Others from "@/components/others/others";
import CallculatorWallpaper from "@/components/wallpaper/calculatorwallpaper";
import Clearance from "@/components/wallpaper/clearance";
import ContainerWallpaper from "@/components/wallpaper/containerWallpaper";
import Hero from "@/components/wallpaper/hero";
import { CategoryProps } from "@/types/categories";
import { HomepageProps } from "@/types/homepage";
import { SubCategoryProps } from "@/types/subCategories";
import { WallpaperProps } from "@/types/wallpaper";

type Slug = { params: { slug: string } };

export default async function SlugProducts({ params }: Slug) {
  let queryCategory: any = {
    populate:
      "image,banners,products,products.discount,products.images,sub_categories.wallpaper_items,sub_categories.wallpaper_items,sub_categories.wallpaper_items.thumbnail,sub_categories.products,sub_categories.products.images,sub_categories.products.discount,sub_categories.thumbnail,sub_categories.accessories,sub_categories.accessories.image",
    "sort[0]": "createdAt:desc",
  };

  if (params.slug === "wallpaper" || params.slug === "flooring") {
    queryCategory["filters[keyPageCondition][$eq]"] = params.slug;
  } else {
    queryCategory["filters[slug][$eq]"] = params.slug;
  }

  const categories: CategoryProps = await getData({
    path: `categories`,
    params: queryCategory,
  });

  const homepage: HomepageProps = await getData({
    path: `homepage`,
    params: {
      populate: "banners,socmed,socmed.logo",
    },
  });

  const wallpaper: WallpaperProps = await getData({
    path: `wallpaper`,
    params: {
      populate: "banners",
    },
  });

  return (
    <>
      {params.slug === "wallpaper" ? (
        <>
          <main className="mt-[100px]">
            <Hero categories={categories} />
            <Clearance categories={categories} />
            <ContainerWallpaper categories={categories} />
            <CallculatorWallpaper wallpaper={wallpaper} />
            <Socmed homepage={homepage} />
          </main>
        </>
      ) : params.slug === "flooring" ? (
        <>
          <main className="mt-[100px]">
            <HeroFlooring categories={categories} />
            <CategoriesFlooring categories={categories} />
            {categories.data[0].attributes.sub_categories.data.map(
              (item, index) => (
                <Floors data={item} key={index} />
              )
            )}
            <SocmedFlooring homepage={homepage} />
          </main>
        </>
      ) : (
        <>
          <main className="mt-[100px]">
            <HeroOthers categories={categories} />
            {categories.data[0].attributes?.sub_categories?.data.map(
              (item, index) => (
                <Others data={item} key={index} />
              )
            )}
            <SocmedFlooring homepage={homepage} />
          </main>
        </>
      )}
    </>
  );
}
