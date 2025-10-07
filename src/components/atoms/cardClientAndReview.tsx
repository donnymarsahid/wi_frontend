import { STRAPI_URL } from "@/app/utils/constans";
import { ReviewsPropsDaum } from "@/types/reviews";
import Image from "next/image";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Modal } from "flowbite-react";
import cx from "classnames";
import { poppins } from "@/app/fonts";

interface PropsCardClientAndReview {
  item: ReviewsPropsDaum;
}

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

const CardClientAndReview = (data: PropsCardClientAndReview, index: string) => {
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
      <button
        onClick={() => openModal(data.item)}
        key={index}
        className="bg-white p-2 rounded-lg mx-2 md:w-[300px] w-[200px]"
      >
        <div className="flex justify-center">
          {Array.from({ length: data.item.attributes.rate }).map((_, i) => (
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
          <div className="flex justify-center mb-4">
            <Image
              src={`${STRAPI_URL}${data?.item?.attributes?.logo?.data?.attributes?.url}`}
              width={500}
              height={500}
              alt="logo"
              className="object-contain rounded-md lg:w-[250px] md:w-[150px] w-[100px] h-auto"
            />
          </div>
          <p
            className={`${cx(
              poppins,
              poppins.className
            )} md:text-xs text-[10px] mb-4 title-custom`}
          >
            {data.item.attributes.desc}
          </p>
        </div>
        <div
          className={`${
            data.item?.attributes?.images?.data?.length === 1 ? "" : "hidden"
          }`}
        >
          <div>
            <Image
              src={
                data.item.attributes?.images?.data?.length
                  ? `${STRAPI_URL}${data.item.attributes.images.data[0]?.attributes?.url}`
                  : "/assets/images/review.png"
              } // replace with your image path
              alt="Wall construction"
              width={400}
              height={300}
              className="h-[201px] object-cover"
              placeholder="blur"
              blurDataURL={`${
                data.item.attributes.images.data?.length
                  ? `${STRAPI_URL}${data.item.attributes.images.data[0]?.attributes?.url}`
                  : "/assets/images/review.png"
              }?w=30&q=10`} // Placeholder low-res
            />
          </div>
        </div>
        <div
          className={`${
            data.item?.attributes?.images?.data?.length === 2 ? "" : "hidden"
          }`}
        >
          <div>
            <Image
              src={
                data.item.attributes.images.data?.length
                  ? `${STRAPI_URL}${data.item.attributes.images.data[0]?.attributes?.url}`
                  : "/assets/images/review.png"
              } // replace with your image path
              alt="Wall construction"
              width={400}
              height={300}
              className="h-[100px] object-cover"
            />
            <Image
              src={
                data.item.attributes.images.data?.length > 1
                  ? `${STRAPI_URL}${data.item.attributes.images.data[1]?.attributes?.url}`
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
            data.item?.attributes?.images?.data?.length === 3 ? "" : "hidden"
          }`}
        >
          <div>
            <Image
              src={
                data.item.attributes.images.data?.length
                  ? `${STRAPI_URL}${data.item.attributes.images.data[0]?.attributes?.url}`
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
                  data.item.attributes.images.data?.length > 1
                    ? `${STRAPI_URL}${data.item.attributes.images.data[1]?.attributes?.url}`
                    : "/assets/images/review.png"
                } // replace with your image path
                alt="Wall construction"
                width={400}
                height={300}
                className="h-[100px] w-[49%] object-cover mt-1 me-[2.5px]"
              />
              <Image
                src={
                  data.item.attributes.images.data?.length > 2
                    ? `${STRAPI_URL}${data.item.attributes.images.data[2]?.attributes?.url}`
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
      <Modal
        show={showModal}
        onClose={closeModal}
        dismissible={true}
        className="z-[9999]"
      >
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
            <div className="flex justify-center mb-4">
              <Image
                src={`${STRAPI_URL}${selectedReview?.attributes?.logo?.data?.attributes?.url}`}
                width={500}
                height={500}
                alt="logo"
                className="object-contain rounded-md lg:w-[200px] md:w-[100px] w-[100px] h-auto"
              />
            </div>
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
};

export default CardClientAndReview;
