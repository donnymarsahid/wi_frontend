import CarouselCategoriesSlider from "../atoms/carouselcategoriesslider";

export default function CategoriesFlooring({ heroBanners }: any) {
  return (
    <>
      <div className="mt-10">
        <div className="container mx-auto">
          <div className="md:mx-10 mx-4">
            <div>
              <div>
                <div>
                  <CarouselCategoriesSlider categories={heroBanners} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
