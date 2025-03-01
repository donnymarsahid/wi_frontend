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

type Slug = { params: { slug: string } };

export async function generateMetadata({ params }: Slug): Promise<Metadata> {
  const slug = (await params).slug;
  const categories: CategoryProps = await getData({
    path: `categories`,
    params: {
      populate: "seo",
      "filters[slug][$eq]": slug.split("--")[0],
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

export default async function SlugProducts({ params }: Slug) {
  const slug = (await params).slug;

  const categories: CategoryProps = await getData({
    path: `categories`,
    params: {
      populate: "sub_categories",
      "fields[0]": "sub_categories",
    },
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
      populate:
        "thumbnail,products,products.brands,products.brands.sub_categories,products.brands.sub_categories.categories",
    },
  });
  const wallpaperByColor: WallpaperByGeneralProps = await getData({
    path: `wallpaper-by-colors`,
    params: {
      populate:
        "thumbnail,products,products.brands,products.brands.sub_categories,products.brands.sub_categories.categories",
    },
  });
  const wallpaperByDesigner: WallpaperByGeneralProps = await getData({
    path: `wallpaper-by-designers`,
    params: {
      populate:
        "thumbnail,products,products.brands,products.brands.sub_categories,products.brands.sub_categories.categories",
    },
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
            {categories.data[0].attributes.sub_categories.data
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
            <CategoriesFlooring heroBanners={heroBanners.data} />
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
          <main className="mt-[100px] md:mt-[200px] lg:mt-[100px]">
            <HeroOthers heroBanners={heroBanners.data} />
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
