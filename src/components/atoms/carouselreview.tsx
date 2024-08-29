"use client";

import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import cx from "classnames";
import { poppins } from "@/app/fonts";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
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

export default function CarouselReview() {
  const banners = [
    {
      url: [
        {
          url: "/assets/dummy/review.png",
        },
        {
          url: "/assets/dummy/review.png",
        },
        {
          url: "/assets/dummy/review.png",
        },
      ],
      rating: 4,
    },
    {
      url: [
        {
          url: "/assets/dummy/review.png",
        },
        {
          url: "/assets/dummy/review.png",
        },
      ],
      rating: 5,
    },
    {
      url: [
        {
          url: "/assets/dummy/review.png",
        },
        {
          url: "/assets/dummy/review.png",
        },
        {
          url: "/assets/dummy/review.png",
        },
      ],
      rating: 3,
    },
    {
      url: [
        {
          url: "/assets/dummy/review.png",
        },
      ],
      rating: 2,
    },
  ];
  return (
    <>
      <style>{styles}</style>
      <div className={`carousel-container ${cx(poppins, poppins.className)}`}>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
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
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {banners.map((item, index) => (
            <div key={index} className="bg-white p-2 rounded-lg mx-2">
              <div className="flex justify-center">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Image
                    key={i}
                    src="/assets/icons/star.svg"
                    width={18}
                    height={18}
                    alt="star"
                    className="me-1"
                  />
                ))}
              </div>
              <div>
                <h3 className="font-semibold md:text-sm text-xs mt-2">
                  Cantika
                </h3>
                <p className="md:text-xs text-[10px] mb-4">
                  Pasang Wallpaper dinding di bantu tukang yg berpengalaman
                </p>
              </div>
              <div className={`${item.url.length === 1 ? "" : "hidden"}`}>
                <div>
                  <Image
                    src={item.url[0]?.url} // replace with your image path
                    alt="Wall construction"
                    width={400}
                    height={300}
                    className="h-[201px] object-cover"
                  />
                </div>
              </div>
              <div className={`${item.url.length === 2 ? "" : "hidden"}`}>
                <div>
                  <Image
                    src={item.url[0]?.url} // replace with your image path
                    alt="Wall construction"
                    width={400}
                    height={300}
                    className="h-[100px] object-cover"
                  />
                  <Image
                    src={item.url[0]?.url} // replace with your image path
                    alt="Wall construction"
                    width={400}
                    height={300}
                    className="h-[100px] object-cover mt-1"
                  />
                </div>
              </div>
              <div className={`${item.url.length === 3 ? "" : "hidden"}`}>
                <div>
                  <Image
                    src={item.url[0]?.url} // replace with your image path
                    alt="Wall construction"
                    width={400}
                    height={300}
                    className="h-[100px] object-cover"
                  />
                  <div className="flex justify-between">
                    <Image
                      src={item.url[0]?.url} // replace with your image path
                      alt="Wall construction"
                      width={400}
                      height={300}
                      className="h-[100px] w-[49%] object-cover mt-1 me-[2.5px]"
                    />
                    <Image
                      src={item.url[0]?.url} // replace with your image path
                      alt="Wall construction"
                      width={400}
                      height={300}
                      className="h-[100px] w-[49%] object-cover mt-1 ms-[2.5px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}
