"use client";

import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { HomepageProps } from "@/types/homepage";
import { STRAPI_URL } from "@/app/utils/constans";
import { CategoryProps } from "@/types/categories";
import cx from "classnames";
import { poppins } from "@/app/fonts";

type HeroHomeProps = {
  categories: CategoryProps;
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const CustomDot = ({ onClick, active }: any) => {
  return (
    <li
      className={`dot ${
        active ? "active rounded-lg w-[40px]" : "inactive rounded-full w-[10px]"
      }`}
      onClick={onClick}
    />
  );
};

// Add some styles to achieve the look from the image
const styles = `
.carousel-container {
  position: relative;
}

.dot {
  display: inline-block;
  height: 10px;
  margin-right: 5px;
  cursor: pointer;
}

.dot.inactive {
  border: 1px solid #5BC0DE; /* Color for the inactive dots (outline) */
  background-color: transparent;
}

.dot.active {
  background-color: #5BC0DE; /* Color for the active dot (filled) */
}

.container-with-dots {
  position: relative;
}

.container-with-dots .react-multi-carousel-dot-list {
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  list-style: none;
}
`;

export default function CarouselCategoriesSlider({
  categories,
}: HeroHomeProps) {
  return (
    <>
      <style>{styles}</style>
      <div className="carousel-container">
        <Carousel
          additionalTransfrom={0}
          arrows={false}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable={true}
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          customDot={<CustomDot />}
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {categories.data[0].attributes.sub_categories.data
            .sort(
              (a, b) =>
                new Date(b.attributes.date).getTime() -
                new Date(a.attributes.date).getTime()
            )
            .map((item, index) => (
              <Link href={""} className="mt-2" key={index}>
                <div
                  key={index}
                  className="relative mt-4 overflow-hidden cursor-pointer rounded-lg md:h-[98px] h-[60px] me-4"
                >
                  <Image
                    src={`${STRAPI_URL}${item.attributes?.thumbnail?.data?.attributes.url}`}
                    width={400}
                    height={400}
                    alt="wall"
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110 rounded-lg"
                  />
                </div>
                <div>
                  <div className="w-full mb-4">
                    <div
                      className={`relative mt-[-20px] flex justify-center ${cx(
                        poppins,
                        poppins.className
                      )}`}
                    >
                      <h3 className="py-2 px-4 bg-white bg-opacity-90 rounded-2xl lg:text-[16px] text-[10px] text-center shadow-lg">
                        {item.attributes.name.replace("Lantai", "")}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          {categories.data[0].attributes.sub_categories.data
            .sort(
              (a, b) =>
                new Date(b.attributes.date).getTime() -
                new Date(a.attributes.date).getTime()
            )
            .map((item, index) => (
              <Link href={""} className="mt-2" key={index}>
                <div
                  key={index}
                  className="relative mt-4 overflow-hidden cursor-pointer rounded-lg md:h-[98px] h-[60px] me-4"
                >
                  <Image
                    src={`${STRAPI_URL}${item.attributes?.thumbnail?.data?.attributes.url}`}
                    width={400}
                    height={400}
                    alt="wall"
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110 rounded-lg"
                  />
                </div>
                <div>
                  <div className="w-full">
                    <div
                      className={`relative mt-[-20px] flex justify-center ${cx(
                        poppins,
                        poppins.className
                      )}`}
                    >
                      <h3 className="py-2 px-4 bg-white bg-opacity-90 rounded-2xl lg:text-[16px] text-[10px] text-center shadow-lg">
                        {item.attributes.name.replace("Lantai", "")}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </Carousel>
      </div>
    </>
  );
}
