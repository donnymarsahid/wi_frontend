"use client";

import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import { ReviewsProps, ReviewsPropsDaum } from "@/types/reviews";
import { STRAPI_URL } from "@/app/utils/constans";
import { Modal } from "flowbite-react";

type ReviewsHomeProps = {
  reviews: ReviewsProps;
};

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

const responsiveCstm = {
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

export default function CarouselReview({ reviews }: ReviewsHomeProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewsPropsDaum | any>(
    null
  );

  const openModal = (review: any) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReview(null);
  };

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
          {reviews.data.map((item, index) => (
            <button
              onClick={() => openModal(item)}
              key={index}
              className="bg-white p-2 rounded-lg mx-2"
            >
              <div className="flex justify-center">
                {Array.from({ length: item.attributes.rate }).map((_, i) => (
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
                  {item.attributes.username}
                </h3>
                <p className="md:text-xs text-[10px] mb-4 title-custom">
                  {item.attributes.desc}
                </p>
              </div>
              <div
                className={`${
                  item.attributes.images.data.length === 1 ? "" : "hidden"
                }`}
              >
                <div>
                  <Image
                    src={
                      item.attributes.images.data[0]?.attributes?.url
                        ? `${STRAPI_URL}${item.attributes.images.data[0]?.attributes?.url}`
                        : "/assets/images/review.png"
                    } // replace with your image path
                    alt="Wall construction"
                    width={400}
                    height={300}
                    className="h-[201px] object-cover"
                  />
                </div>
              </div>
              <div
                className={`${
                  item.attributes.images.data.length === 2 ? "" : "hidden"
                }`}
              >
                <div>
                  <Image
                    src={
                      item.attributes.images.data[0]?.attributes?.url
                        ? `${STRAPI_URL}${item.attributes.images.data[0]?.attributes?.url}`
                        : "/assets/images/review.png"
                    } // replace with your image path
                    alt="Wall construction"
                    width={400}
                    height={300}
                    className="h-[100px] object-cover"
                  />
                  <Image
                    src={
                      item.attributes.images.data[1]?.attributes?.url
                        ? `${STRAPI_URL}${item.attributes.images.data[1]?.attributes?.url}`
                        : "/assets/images/review.png"
                    } // replace with your image path
                    alt="Wall construction"
                    width={400}
                    height={300}
                    className="h-[100px] object-cover mt-1"
                  />
                </div>
              </div>
              <div
                className={`${
                  item.attributes.images.data.length === 3 ? "" : "hidden"
                }`}
              >
                <div>
                  <Image
                    src={
                      item.attributes.images.data[0]?.attributes?.url
                        ? `${STRAPI_URL}${item.attributes.images.data[0]?.attributes?.url}`
                        : "/assets/images/review.png"
                    } // replace with your image path
                    alt="Wall construction"
                    width={400}
                    height={300}
                    className="h-[100px] object-cover"
                  />
                  <div className="flex justify-between">
                    <Image
                      src={
                        item.attributes.images.data[1]?.attributes?.url
                          ? `${STRAPI_URL}${item.attributes.images.data[1]?.attributes?.url}`
                          : "/assets/images/review.png"
                      } // replace with your image path
                      alt="Wall construction"
                      width={400}
                      height={300}
                      className="h-[100px] w-[49%] object-cover mt-1 me-[2.5px]"
                    />
                    <Image
                      src={
                        item.attributes.images.data[2]?.attributes?.url
                          ? `${STRAPI_URL}${item.attributes.images.data[2]?.attributes?.url}`
                          : "/assets/images/review.png"
                      } // replace with your image path
                      alt="Wall construction"
                      width={400}
                      height={300}
                      className="h-[100px] w-[49%] object-cover mt-1 ms-[2.5px]"
                    />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </Carousel>
      </div>
      <Modal show={showModal} onClose={closeModal} className="z-[9999]">
        <Modal.Header className="bg-white border-b-1">
          <div className="text-center font-bold">
            <div className={`${cx(poppins, poppins.className)} text-[#3D3D3D]`}>
              <h1>Detail Review</h1>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="bg-white">
          <div className="flex justify-center">
            {Array.from({ length: selectedReview?.attributes?.rate }).map(
              (_, i) => (
                <Image
                  key={i}
                  src="/assets/icons/star.svg"
                  width={18}
                  height={18}
                  alt="star"
                  className="me-1"
                />
              )
            )}
          </div>
          <div className={`${cx(poppins, poppins.className)}`}>
            <h3 className="font-semibold">
              {selectedReview?.attributes?.username}
            </h3>
            <p className="mb-4">{selectedReview?.attributes?.desc}</p>
          </div>
          <div>
            <Carousel
              additionalTransfrom={0}
              arrows
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
              responsive={responsiveCstm}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={true}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              {selectedReview?.attributes?.images?.data?.length &&
                selectedReview.attributes.images.data.map(
                  (item: any, index: any) => (
                    <div key={index}>
                      <Image
                        src={`${STRAPI_URL}${item.attributes.url}`}
                        width={1000}
                        height={600}
                        className="bg-cover bg-center w-full h-[300px] pb-4"
                        alt="banners"
                      />
                    </div>
                  )
                )}
            </Carousel>
          </div>
        </Modal.Body>
        <Modal.Footer
          className={`bg-white p-2 border-t-1 flex justify-center ${cx(
            poppins,
            poppins.className
          )}`}
        >
          <button onClick={() => closeModal()}>
            <h1 className="text-[#44CBEB] font-bold">Tutup</h1>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
