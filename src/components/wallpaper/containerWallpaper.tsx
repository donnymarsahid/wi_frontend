import { SubCategoryProps } from "@/types/subCategories";
import Wallpapers from "./wallpapers";
import { CategoryProps } from "@/types/categories";

type HeroContainerWallpaperProps = {
  categories: CategoryProps;
};

export default async function ContainerWallpaper({
  categories,
}: HeroContainerWallpaperProps) {
  return (
    <div>
      {categories.data[0].attributes.sub_categories.data.map((item, index) => (
        <Wallpapers data={item} key={index} />
      ))}
    </div>
  );
}
