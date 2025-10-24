import BannerFlooringDetail from "../atoms/bannerFlooringDetail";

export default function HeroFlooringDetail({ heroBanners }: any) {
  return (
    <div>
      <div className="container mx-auto mt-[120px] md:mt-[150px] lg:mt-[0px]">
        <div className="md:mx-10 mx-4">
          <BannerFlooringDetail />
        </div>
      </div>
    </div>
  );
}
