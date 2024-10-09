import { poppins } from "@/app/fonts";
import { getData } from "@/app/utils/fetching";
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
import Image from "next/image";
import cx from "classnames";
import { WallpaperByGeneralProps } from "@/types/wallpaperByGeneral";

type Slug = { params: { slug: string } };

export default async function SlugProducts({ params }: Slug) {
  let queryCategory: any = {
    populate:
      "image,banners,brands,brands.discount,brands.images,sub_categories.wallpaper_items,sub_categories.wallpaper_items,sub_categories.wallpaper_items.thumbnail,sub_categories.brands,sub_categories.brands.images,sub_categories.brands.discount,sub_categories.thumbnail,sub_categories",
    "sort[0]": "date:desc",
    "sort[1]": "sub_categories.date:desc",
  };

  if (
    params.slug === "wallpaper" ||
    params.slug === "flooring" ||
    params.slug === "wallpanel" ||
    params.slug === "carpet" ||
    params.slug === "decking" ||
    params.slug === "rollerblind"
  ) {
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
  const wallpaperByStyle: WallpaperByGeneralProps = await getData({
    path: `wallpaper-by-styles`,
    params: {
      populate: "thumbnail,products,products.brands,products.brands.sub_categories,products.brands.sub_categories.categories",
    },
  });
  const wallpaperByColor: WallpaperByGeneralProps = await getData({
    path: `wallpaper-by-colors`,
    params: {
      populate: "thumbnail,products,products.brands,products.brands.sub_categories,products.brands.sub_categories.categories",
    },
  });
  const wallpaperByDesigner: WallpaperByGeneralProps = await getData({
    path: `wallpaper-by-designers`,
    params: {
      populate: "thumbnail,products,products.brands,products.brands.sub_categories,products.brands.sub_categories.categories",
    },
  });

  return (
    <>
      {params.slug === "wallpaper" ? (
        <>
          <main className="mt-[100px]">
            <Hero categories={categories} />
            <Clearance categories={categories} />
            <ContainerWallpaper
              wallpaperByStyle={wallpaperByStyle}
              wallpaperByColor={wallpaperByColor}
              wallpaperByDesigner={wallpaperByDesigner}
            />
            <CallculatorWallpaper wallpaper={wallpaper} />
            <Socmed homepage={homepage} />
          </main>
        </>
      ) : params.slug === "flooring" ||
        params.slug === "wallpanel" ||
        params.slug === "carpet" ||
        params.slug === "decking" ? (
        <>
          <main className="mt-[100px]">
            <HeroFlooring categories={categories} />
            <CategoriesFlooring categories={categories} />
            {categories.data[0].attributes.sub_categories.data
              .sort(
                (a, b) =>
                  new Date(b.attributes.date).getTime() -
                  new Date(a.attributes.date).getTime()
              )
              .map((item, index) => (
                <Floors data={item} key={index} />
              ))}
            <SocmedFlooring homepage={homepage} />
          </main>
        </>
      ) : (
        <>
          <main className="mt-[100px]">
            <HeroOthers categories={categories} />
            {categories.data[0]?.attributes?.sub_categories?.data?.length > 0 &&
              categories.data[0].attributes.sub_categories.data
                .sort(
                  (a, b) =>
                    new Date(b.attributes.date).getTime() -
                    new Date(a.attributes.date).getTime()
                )
                .map((item, index) => <Others data={item} key={index} />)}

            {!categories.data[0]?.attributes?.sub_categories?.data?.length && (
              <>
                <div
                  className={`w-full flex justify-center my-24 ${cx(
                    poppins,
                    poppins.className
                  )}`}
                >
                  <div>
                    <Image
                      src="/assets/icons/empty.jpg"
                      width={200}
                      height={200}
                      alt="logo-horizontal"
                    />
                    <h1 className="text-center font-bold text-[#44CBEB]">
                      Data Kosong!
                    </h1>
                  </div>
                </div>
              </>
            )}
            <SocmedFlooring homepage={homepage} />
          </main>
        </>
      )}
    </>
  );
}
