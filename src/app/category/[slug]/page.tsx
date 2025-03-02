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
import RollerBlind from "@/components/rollerblind/rollerblind";
import HeroCategory from "@/components/rollerblind/hero";
import { Metadata } from "next";

type tParams = Promise<{ slug: string }>;

export async function generateMetadata(props: {
  params: tParams;
}): Promise<Metadata> {
  const slug = (await props.params).slug;
  const categories: CategoryProps = await getData({
    path: `categories`,
    params: {
      populate: "seo",
      "filters[slug][$eq]": slug.split("--")[0],
      "fields[0]": "seo",
    },
  });
  try {
    const { seo } = categories.data[0].attributes;

    // const previousImages = (await parent).openGraph?.images || [];
    return {
      title: seo.title,
      description: seo.description,
      viewport: seo.viewport,
      keywords: seo.keywords,
      robots: seo.robots,
    };
  } catch (error) {
    return {
      title:
        "Wallpaper Indonesia | Pusat Belanja Online Material Interior di Indonesia",
      description:
        "Wallpaper Indonesia merupakan pusat pembelanjaan online untuk material interior mulai dari Wallpaper, Wallfoam 3D, Vinyl Flooring, Parquet Flooring, Gordyn, Blind dan Carpet Tile. Tersedia dalam beragam motif, warna, dan merek yang sesuai dengan kebutuhan Anda.",
    };
  }
}

export default async function SlugProducts(props: { params: tParams }) {
  const slug = (await props.params).slug;

  const homepage: HomepageProps = await getData({
    path: `homepage`,
    params: {
      populate: "socmed,socmed.logo",
      "fields[0]": "socmed",
    },
  });

  const wallpaper: WallpaperProps = await getData({
    path: `wallpaper`,
    params: {
      populate: "banners",
      "fields[0]": "youtubeChannel",
    },
  });

  let queryWallpaper = {
    populate: "thumbnail",
    "fields[0]": "slug",
    "fields[1]": "thumbnail",
    "fields[2]": "title",
  };

  const wallpaperByStyle: WallpaperByGeneralProps = await getData({
    path: `wallpaper-by-styles`,
    params: queryWallpaper,
  });

  const wallpaperByColor: WallpaperByGeneralProps = await getData({
    path: `wallpaper-by-colors`,
    params: queryWallpaper,
  });
  const wallpaperByDesigner: WallpaperByGeneralProps = await getData({
    path: `wallpaper-by-designers`,
    params: queryWallpaper,
  });

  // Wallpaper Start
  const clearance = await getData({
    path: "brands",
    params: {
      populate: "categories,sub_categories,images",
      "fields[0]": "images",
      "fields[1]": "slug",
      "fields[2]": "title",
      "fields[3]": "thickness",
      "fields[4]": "size_height",
      "fields[5]": "size_width",
      "fields[6]": "unitOfMeasureHeight",
      "fields[7]": "discount",
      "fields[8]": "price",
      "fields[9]": "pricePerMeter",
      "filters[categories][slug][$eq]": "wallpaper",
      "filters[sub_categories][slug][$eq]": "clearance",
    },
  });
  // Wallpaper End

  const heroBanners = await getData({
    path: "categories",
    params: {
      populate: "banners,sub_categories,thumbnail",
      "fields[0]": "banners",
      "fields[1]": "sub_categories",
      "fields[2]": "thumbnail",
      "filters[slug][$eq]": "wallpaper",
    },
  });

  let subCategoriesSectionqueryCategory = {};
  if (
    slug.split("--")[0] === "wallpaper" ||
    slug.split("--")[0] === "flooring" ||
    slug.split("--")[0] === "wallpanel" ||
    slug.split("--")[0] === "carpet" ||
    slug.split("--")[0] === "decking" ||
    slug.split("--")[0] === "rollerblind"
  ) {
    subCategoriesSectionqueryCategory[
      "filters[categories][keyPageCondition][$eq]"
    ] = slug.split("--")[0];
  } else {
    subCategoriesSectionqueryCategory["filters[categories][slug][$eq]"] =
      slug.split("--")[0];
  }

  const subCategoriesSection = await getData({
    path: "sub-categories",
    params: {
      populate: "brands,brands.images,banners,categories,thumbnail",
      "fields[0]": "banners",
      "fields[1]": "categories",
      "fields[2]": "name",
      "fields[3]": "thumbnail",
      ...subCategoriesSectionqueryCategory,
    },
  });

  return (
    <>
      {slug.split("--")[0] === "wallpaper" ? (
        <>
          <main className="mt-[100px] md:mt-[200px] lg:mt-[100px]">
            <Hero heroBanners={heroBanners.data} />
            <Clearance productsClearanceResult={clearance.data} />
            <ContainerWallpaper
              wallpaperByStyle={wallpaperByStyle}
              wallpaperByColor={wallpaperByColor}
              wallpaperByDesigner={wallpaperByDesigner}
            />
            <CallculatorWallpaper wallpaper={wallpaper} />
            <Socmed homepage={homepage} />
          </main>
        </>
      ) : slug.split("--")[0] === "rollerblind" ? (
        <>
          <main className="mt-[100px] md:mt-[200px] lg:mt-[100px]">
            <HeroCategory heroBanners={heroBanners.data} />
            {subCategoriesSection.data
              .sort(
                (a, b) =>
                  new Date(b.attributes.date).getTime() -
                  new Date(a.attributes.date).getTime()
              )
              .map((item, index) => (
                <RollerBlind data={item} key={index} />
              ))}
          </main>
        </>
      ) : slug.split("--")[0] === "flooring" ||
        slug.split("--")[0] === "wallpanel" ||
        slug.split("--")[0] === "carpet" ||
        slug.split("--")[0] === "decking" ? (
        <>
          <main className="mt-[100px] md:mt-[200px] lg:mt-[100px]">
            <HeroFlooring heroBanners={heroBanners.data} />
            <CategoriesFlooring heroBanners={subCategoriesSection.data} />
            {subCategoriesSection.data
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
          <main className="mt-[100px] md:mt-[200px] lg:mt-[100px]">
            <HeroOthers heroBanners={heroBanners.data} />
            {subCategoriesSection?.data?.length > 0 &&
              subCategoriesSection?.data
                .sort(
                  (a, b) =>
                    new Date(b.attributes.date).getTime() -
                    new Date(a.attributes.date).getTime()
                )
                .map((item, index) => <Others data={item} key={index} />)}

            {!subCategoriesSection?.data?.length && (
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
