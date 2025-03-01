import CarouselBannerWallpaper from "../atoms/carouselbannerwallpaper";

export default function Hero({ heroBanners }: any) {
  return (
    <div>
      <div className="container mx-auto mt-[120px] md:mt-[150px] lg:mt-[0px]">
        <div className="md:mx-10 mx-4">
          <CarouselBannerWallpaper categories={heroBanners} />
        </div>
      </div>
    </div>
  );
}
