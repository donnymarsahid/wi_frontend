import { SubCategoryProps } from "@/types/subCategories";
import Wallpapers from "./wallpapers";
import { CategoryProps } from "@/types/categories";
import { WallpaperByGeneralProps } from "@/types/wallpaperByGeneral";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";

type HeroContainerWallpaperProps = {
  wallpaperByStyle: WallpaperByGeneralProps;
  wallpaperByColor: WallpaperByGeneralProps;
  wallpaperByDesigner: WallpaperByGeneralProps;
};

export default async function ContainerWallpaper({
  wallpaperByStyle,
  wallpaperByColor,
  wallpaperByDesigner,
}: HeroContainerWallpaperProps) {
  const arr = [
    "Wallpaper By Style",
    "Wallpaper By Color",
    "Wallpaper By Designer",
  ];
  return (
    <div>
      {arr.map((item, index) => (
        <div key={index}>
          {item === "Wallpaper By Style" ? (
            <Wallpapers titleKey={item} data={wallpaperByStyle} />
          ) : item === "Wallpaper By Color" ? (
            <Wallpapers titleKey={item} data={wallpaperByColor} />
          ) : item === "Wallpaper By Designer" ? (
            <Wallpapers titleKey={item} data={wallpaperByDesigner} />
          ) : (
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
          )}
        </div>
      ))}
    </div>
  );
}
