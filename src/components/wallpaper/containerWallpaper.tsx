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
      {categories.data[0].attributes.sub_categories.data
        .sort(
          (a, b) =>
            new Date(b.attributes.date).getTime() -
            new Date(a.attributes.date).getTime()
        )
        .map((item, index) => (
          <Wallpapers data={item} key={index} />
        ))}
    </div>
  );
}
