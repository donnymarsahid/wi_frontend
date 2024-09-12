import { SubCategoryProps } from "@/types/subCategories";
import Wallpapers from "./wallpapers";

type HeroContainerWallpaperProps = {
    subCategories: SubCategoryProps;
  };

export default async function ContainerWallpaper({subCategories}: HeroContainerWallpaperProps) {
  return (
    <div>
      {subCategories.data.map((item, index) => (
        <Wallpapers data={item} key={index} />
      ))} 
    </div>
  );
}
