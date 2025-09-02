"use client";

import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { HomepageProps } from "@/types/homepage";
import { STRAPI_URL } from "@/app/utils/constans";

type HeroHomeProps = {
  homepage: HomepageProps;
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
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

export default function CarouselBanner({ homepage }: HeroHomeProps) {
  return (
    <>
      <style>{styles}</style>
      <div className="carousel-container">
        <Carousel
          additionalTransfrom={0}
          arrows={false}
          autoPlay
          autoPlaySpeed={4500}
          customTransition="2s"
          transitionDuration={5000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
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
          showDots={true}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {homepage.data.attributes.banners.data.map((item, index) => (
            <div key={index}>
              <Image
                src={`${STRAPI_URL}${item.attributes.url}`}
                width={1000}
                height={150}
                placeholder="blur"
                blurDataURL={`${STRAPI_URL}${item.attributes.url}?w=30&q=10`} // Placeholder low-res
                className="bg-cover bg-center w-full h-full pb-4"
                alt="banners"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}
