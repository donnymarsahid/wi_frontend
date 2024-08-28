"use client";

import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";

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

export default function CarouselBannerPromoProduct() {
  const banners = [
    {
      arr: [
        {
          url: "/assets/dummy/promo-1.png",
        },
        {
          url: "/assets/dummy/promo-2.png",
        },
        {
          url: "/assets/dummy/promo-3.png",
        },
        {
          url: "/assets/dummy/promo-4.png",
        },
      ],
    },
    {
      arr: [
        {
          url: "/assets/dummy/promo-4.png",
        },
        {
          url: "/assets/dummy/promo-3.png",
        },
        {
          url: "/assets/dummy/promo-2.png",
        },
        {
          url: "/assets/dummy/promo-1.png",
        },
      ],
    },
  ];
  return (
    <>
      <style>{styles}</style>
      <div className="carousel-container">
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
            <div key={index} className="grid gap-4 md:grid-cols-2 grid-cols-2">
              {item.arr.map((child, indexChild) => (
                <div key={indexChild} className="relative group">
                  <Image
                    src={child.url}
                    width={1000}
                    height={600}
                    className="w-full h-full pb-4 rounded-lg"
                    alt="banners"
                  />
                  <Link
                    href={""}
                    className="absolute top-0 w-full h-full rounded-lg"
                  >
                    <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-25 rounded-lg transition"></span>
                    <span className="absolute inset-0 flex items-center justify-center text-white md:text-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition lucida-bright">
                      Lihat Detail
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}
