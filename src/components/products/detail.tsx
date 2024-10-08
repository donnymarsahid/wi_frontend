"use client";

import { STRAPI_URL } from "@/app/utils/constans";
import { PromosProps } from "@/types/promos";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import {
  calculateDiscount,
  formatDate,
  formatNumberToLetter,
  formatRupiah,
} from "@/app/lib/utils";
import { NewsProps } from "@/types/news";
import CardNews from "../atoms/cardNews";
import "../../app/blockStyle.css";
import { ProductsProps } from "@/types/products";
import ModalImage from "../atoms/modalimage";
import { useState } from "react";
import MarkdownComponent from "../atoms/markdown";

type ProductPageProps = {
  data: ProductsProps;
};

export default function Detail({ data }: ProductPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const changeMainImage = (index: number) => {
    setMainImageIndex(index);
  };

  return (
    <div className={`${cx(poppins, poppins.className)}`}>
      <div className="container mx-auto">
        <div className="md:mx-10 mx-4">
          <div
            className={`bg-[#F3F4F6] p-4 flex justify-start ${cx(
              poppins,
              poppins.className
            )} text-[#5BC7E1]`}
          >
            <div className="flex items-center p-4">
              <Link
                className="font-medium hover:text-[#2FD1C1] me-2"
                href={"/"}
              >
                <p>Beranda</p>
              </Link>
              /
              {data.data[0].attributes.brands.data[0].attributes.categories
                ?.data?.length ? (
                <Link
                  className="font-medium hover:text-[#2FD1C1] mx-2"
                  href={`/category/${data.data[0].attributes.brands.data[0].attributes.categories.data[0].attributes.slug}`}
                >
                  <p>
                    {
                      data.data[0].attributes.brands.data[0].attributes
                        .categories.data[0].attributes.title
                    }
                  </p>
                </Link>
              ) : (
                <Link
                  className="font-medium hover:text-[#2FD1C1] mx-2"
                  href={`/category/${data.data[0].attributes.brands.data[0].attributes.sub_categories.data[0].attributes.categories.data[0].attributes.slug}`}
                >
                  <p>
                    {
                      data.data[0].attributes.brands.data[0].attributes
                        .sub_categories.data[0].attributes.categories.data[0]
                        .attributes.title
                    }
                  </p>
                </Link>
              )}
              /
              <Link
                className="font-medium hover:text-[#2FD1C1] mx-2"
                href={`/category/product/${data.data[0].attributes.brands.data[0].attributes.slug}`}
              >
                <p>{data.data[0].attributes.brands.data[0].attributes.title}</p>
              </Link>
              /
              <Link
                className="font-medium hover:text-[#2FD1C1] mx-2"
                href={`#`}
              >
                <p>{data.data[0].attributes.title}</p>
              </Link>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-full w-full bg-white p-6 shadow-lg lg:flex">
              <div className="h-full lg:w-1/2 ">
                <div className="flex flex-row-reverse mb-6">
                  <div className="ms-2 w-full">
                    <div className="cursor-pointer" onClick={openModal}>
                      <Image
                        src={`${STRAPI_URL}${data.data[0].attributes.images.data[mainImageIndex].attributes.url}`}
                        width={400}
                        height={400}
                        alt="wall"
                        className="w-full md:h-[500px] h-[300px] item.-cover"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    {data.data[0].attributes.images.data?.map((item, index) => (
                      <div
                        className="group relative cursor-pointer rounded-lg bg-blue-300 mb-2"
                        key={index}
                        onClick={() => changeMainImage(index)}
                      >
                        <div className="flex h-full w-full items-center justify-center">
                          <Image
                            unoptimized
                            src={STRAPI_URL + item.attributes.url}
                            width={400}
                            height={400}
                            className="w-full md:h-[100px] h-[50px] object-cover"
                            alt={"image"}
                          />
                        </div>
                        <div className="absolute left-0 top-0 h-full w-full rounded-lg bg-black bg-opacity-0 transition duration-300 ease-in-out group-hover:bg-opacity-30"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-full md:px-6  lg:w-1/2">
                <div className="w-full font-medium">
                  <div>
                    <h1 className="font-bold md:text-[24px] text-[20px] text-blue-400">
                      {data.data[0].attributes.title}
                    </h1>
                  </div>
                  {data.data[0].attributes.brands.data[0].attributes
                    .discount ? (
                    <div className="flex w-full justify-between">
                      <div className="text-xl text-blue-400 line-through">
                        {formatRupiah(
                          parseFloat(
                            parseFloat(
                              data.data[0].attributes.brands.data[0].attributes
                                .price
                            ).toString()
                          )
                        )}
                      </div>
                      <div className="text-xl text-red-400">
                        {calculateDiscount(
                          parseFloat(
                            data.data[0].attributes.brands.data[0].attributes
                              .price
                          ),
                          data.data[0].attributes.brands.data[0].attributes
                            .discount?.type
                            ? data.data[0].attributes.brands.data[0].attributes
                                .discount?.type
                            : "",
                          parseFloat(
                            data.data[0].attributes.brands.data[0].attributes
                              .discount?.value
                          )
                            ? parseFloat(
                                data.data[0].attributes.brands.data[0]
                                  .attributes.discount?.value
                              )
                            : 0
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xl text-blue-400">
                      {formatRupiah(
                        parseFloat(
                          parseFloat(
                            data.data[0].attributes.brands.data[0].attributes
                              .price
                          ).toString()
                        )
                      )}
                    </div>
                  )}
                  <div className="my-2">
                    <button className="bg-blue-400 cursor-default px-2 py-1 rounded-2xl">
                      <p className="text-sm text-white">
                        {data.data[0].attributes.available
                          ? "Available"
                          : "Not Available"}
                      </p>
                    </button>
                  </div>
                  <div className="bg-[#F3F4F6] p-2 mt-2 rounded-md">
                    <table className="text-[10px] md:text-[16px] font-light">
                      <tbody>
                        <tr>
                          <td>Jenis</td>
                          <td>: Lantai Vinyl & SPC</td>
                        </tr>
                        <tr>
                          <td>Merk</td>
                          <td>
                            :{" "}
                            {data.data[0].attributes?.brands?.data[0]
                              ?.attributes?.title || "-"}
                          </td>
                        </tr>
                        <tr>
                          <td>Kode</td>
                          <td>
                            : {data.data[0].attributes?.product_code || "-"}
                          </td>
                        </tr>
                        <tr>
                          <td>Warna</td>
                          <td>: #</td>
                        </tr>
                        <tr>
                          <td>Motif</td>
                          <td>: #</td>
                        </tr>
                        <tr>
                          <td className="w-[120px] md:w-[200px]">
                            Ukuran Per Lembar
                          </td>
                          <td>
                            : L=
                            {
                              data.data[0].attributes.brands.data[0].attributes
                                .size_width
                            }
                            cm x P=
                            {
                              data.data[0].attributes.brands.data[0].attributes
                                .size_height
                            }
                          </td>
                        </tr>
                        <tr>
                          <td>Ketebalan</td>
                          <td>
                            :{" "}
                            {
                              data.data[0].attributes.brands.data[0].attributes
                                .thickness
                            }
                          </td>
                        </tr>
                        <tr>
                          <td>Isi Per Box</td>
                          <td>: 3.32m2 / 19 lembar</td>
                        </tr>
                        <tr>
                          <td>Berat</td>
                          <td>
                            :{" "}
                            {data.data[0].attributes.brands.data[0].attributes
                              .product_weight || "-"}{" "}
                            kg
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mt-10 flex-col bg-gray-100 p-4 text-sm">
                  <h1 className="mb-4 font-medium">Deskripsi</h1>
                  <hr />
                  <div className="mt-2"></div>
                  <MarkdownComponent markdown={data.data[0].attributes.desc} />
                </div>
                <div className="mt-6">
                  <div className="grid gap-4 lg:grid-cols-3 grid-cols-2">
                    {data.data[0].attributes.brands.data.length &&
                      data.data[0].attributes.brands.data[0].attributes.products?.data
                        .filter(
                          (itemData) =>
                            itemData.attributes.slug !==
                            data.data[0].attributes.slug
                        )
                        .map((item, index) => (
                          <Link
                            href={`/products/${item.attributes.slug}`}
                            key={index}
                            className="rounded-lg border-[1px] border-[#A5A5A5] cursor-pointer transition scale-[0.98] hover:scale-[1]"
                          >
                            <div>
                              <Image
                                src={`${STRAPI_URL}${item.attributes.images.data[0].attributes.url}`}
                                width={100}
                                height={100}
                                alt="image"
                                className="w-full h-[150px] object-cover rounded-tl-md rounded-tr-md"
                              />
                              <div>
                                <p className="text-[12px] font-medium text-center p-2">
                                  {item.attributes.title}
                                </p>
                                <div className="p-2 flex justify-between">
                                  <div
                                    className={`${
                                      data.data[0].attributes.brands.data[0]
                                        .attributes.discount
                                        ? ""
                                        : "hidden"
                                    } flex`}
                                  >
                                    <p className="text-[#FF0000] line-through  text-[9px]">
                                      {formatRupiah(
                                        parseFloat(
                                          data.data[0].attributes.brands.data[0]
                                            .attributes.price
                                        )
                                      )}
                                    </p>
                                  </div>
                                  <p className="text-[12px] font-medium text-[#474747]">
                                    {!data.data[0].attributes.brands.data[0]
                                      .attributes.discount &&
                                      formatRupiah(
                                        parseFloat(
                                          data.data[0].attributes.brands.data[0]
                                            .attributes.price
                                        )
                                      )}
                                    {calculateDiscount(
                                      parseFloat(
                                        data.data[0].attributes.brands.data[0]
                                          .attributes.price
                                      ),
                                      data.data[0].attributes.brands.data[0]
                                        .attributes.discount?.type
                                        ? data.data[0].attributes.brands.data[0]
                                            .attributes.discount?.type
                                        : "",
                                      data.data[0].attributes.brands.data[0]
                                        .attributes.discount?.value
                                        ? parseFloat(
                                            data.data[0].attributes.brands
                                              .data[0].attributes.discount
                                              ?.value
                                          )
                                        : 0
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                  </div>
                </div>
              </div>
            </div>

            <ModalImage
              openModal={isModalOpen}
              setOpenModal={setIsModalOpen}
              urlImage={`${data.data[0].attributes.images.data[mainImageIndex].attributes.url}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
