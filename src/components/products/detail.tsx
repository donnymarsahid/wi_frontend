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
            <Link className="me-2 font-medium hover:text-[#2FD1C1]" href={"/"}>
              <p>Beranda</p>
            </Link>
            <p>/</p>
            <Link
              className="ms-2 me-2 font-medium hover:text-[#2FD1C1]"
              href={"/products"}
            >
              <p>Product</p>
            </Link>
            <p>/</p>
            <Link
              className="ms-2 me-2 font-medium hover:text-[#2FD1C1] title-custom-2"
              href={`/news/${data.data[0].attributes.slug}`}
            >
              <p>{data.data[0].attributes.title}</p>
            </Link>
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
                  {data.data[0].attributes.discount ? (
                    <div className="flex w-full justify-between">
                      <div className="text-xl text-blue-400 line-through">
                        {formatRupiah(
                          parseFloat(
                            parseFloat(data.data[0].attributes.price).toString()
                          )
                        )}
                      </div>
                      <div className="text-xl text-red-400">
                        {calculateDiscount(
                          parseFloat(data.data[0].attributes.price),
                          data.data[0].attributes.discount?.type
                            ? data.data[0].attributes.discount?.type
                            : "",
                          parseFloat(data.data[0].attributes.discount?.value)
                            ? parseFloat(
                                data.data[0].attributes.discount?.value
                              )
                            : 0
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xl text-blue-400">
                      {formatRupiah(
                        parseFloat(
                          parseFloat(data.data[0].attributes.price).toString()
                        )
                      )}
                    </div>
                  )}
                  <div className="bg-[#F3F4F6] p-2 mt-2 rounded-md">
                    <table className="text-[10px] md:text-[16px] font-light">
                      <tbody>
                        <tr>
                          <td>Jenis</td>
                          <td>: Lantai Vinyl & SPC</td>
                        </tr>
                        <tr>
                          <td>Merk</td>
                          <td>: DAEDONG - Vinyl - 2mm</td>
                        </tr>
                        <tr>
                          <td>Kode</td>
                          <td>: D1</td>
                        </tr>
                        <tr>
                          <td>Warna</td>
                          <td>: Abu-Abu Muda</td>
                        </tr>
                        <tr>
                          <td>Motif</td>
                          <td>: kayu</td>
                        </tr>
                        <tr>
                          <td className="w-[120px] md:w-[200px]">
                            Ukuran Per Lembar
                          </td>
                          <td>: L=18.6cm x P=94cm</td>
                        </tr>
                        <tr>
                          <td>Ketebalan</td>
                          <td>: 2mm</td>
                        </tr>
                        <tr>
                          <td>Isi Per Box</td>
                          <td>: 3.32m2 / 19 lembar</td>
                        </tr>
                        <tr>
                          <td>Berat</td>
                          <td>: 25 Kg</td>
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
                      data.data[0].attributes.brands.data[0].attributes.products?.data.map(
                        (item, index) => (
                          <div
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
                                      item.attributes.discount ? "" : "hidden"
                                    } flex`}
                                  >
                                    <p className="text-[#FF0000] line-through  text-[9px]">
                                      {formatRupiah(
                                        parseFloat(item.attributes.price)
                                      )}
                                    </p>
                                  </div>
                                  <p className="text-[12px] font-medium text-[#474747]">
                                    {!item.attributes.discount &&
                                      formatRupiah(
                                        parseFloat(item.attributes.price)
                                      )}
                                    {calculateDiscount(
                                      parseFloat(item.attributes.price),
                                      item.attributes.discount?.type
                                        ? item.attributes.discount?.type
                                        : "",
                                      item.attributes.discount?.value
                                        ? parseFloat(
                                            item.attributes.discount?.value
                                          )
                                        : 0
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
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
