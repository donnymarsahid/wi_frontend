import Categories from "@/components/home/categories";
import Clients from "@/components/home/clients";
import Socmed from "@/components/home/socmed";
import CallculatorWallpaper from "@/components/wallpaper/calculatorwallpaper";
import Clearance from "@/components/wallpaper/clearance";
import Hero from "@/components/wallpaper/hero";
import WallpaperByColor from "@/components/wallpaper/wallpaperbycolor";
import WallpaperByDesigner from "@/components/wallpaper/wallpaperbydesigner";
import WallpaperBystyle from "@/components/wallpaper/wallpaperbystyle";

export default function Home() {
  return (
    <main className="mt-[100px]">
      <Hero />
      <Clearance />
      <WallpaperBystyle />
      <WallpaperByColor />
      <WallpaperByDesigner />
      <CallculatorWallpaper />
      <Socmed />
    </main>
  );
}
