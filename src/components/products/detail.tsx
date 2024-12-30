"use client";

import { STRAPI_URL } from "@/app/utils/constans";
import { PromosProps } from "@/types/promos";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import {
  calculateDiscount,
  calculateDiscountNumber,
  formatDate,
  formatNumberToLetter,
  formatRupiah,
} from "@/app/lib/utils";
import { NewsProps } from "@/types/news";
import CardNews from "../atoms/cardNews";
import "../../app/blockStyle.css";
import { ProductsProps } from "@/types/products";
import ModalImage from "../atoms/modalimage";
import { useState, useEffect } from "react";
import MarkdownComponent from "../atoms/markdown";
import {
  getDecryptedLocalStorage,
  setEncryptedLocalStorage,
} from "@/lib/utils";
import Swal from "sweetalert2";
import { CartProps } from "@/types/cart";
import { FlashSaleProps } from "@/types/flashsale";
import { FlashSaleDetailProduct } from "../atoms/flashsaledetailproduct";

type ProductPageProps = {
  data: ProductsProps;
  flashsale: FlashSaleProps;
};

export default function Detail({ data, flashsale }: ProductPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlashSale, setIsFlashSale] = useState(false);

  let storedImageData: CartProps[] | null = null;

  const openModal = () => {
    setIsModalOpen(true);
  };
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [priceFinishedProduct, setPriceFinishedProduct] = useState(
    data.data[0].attributes.brands.data[0].attributes.discount?.type &&
      data.data[0].attributes.brands.data[0].attributes.discount.value
      ? calculateDiscountNumber(
          parseFloat(data.data[0].attributes.brands.data[0].attributes.price),
          data.data[0].attributes.brands.data[0].attributes.discount.type,
          data.data[0].attributes.brands.data[0].attributes.discount.value
        ) * 1
      : parseFloat(data.data[0].attributes.brands.data[0].attributes.price) * 1
  );
  const [quantity, setQuantity] = useState(1); // Tambahkan state untuk quantity

  const increment = () => {
    setQuantity(quantity + 1);
    const qtyResult = quantity + 1;

    // Accumulate Qty Start
    const value_accumulate =
      data.data[0].attributes.brands.data[0].attributes.discount?.type &&
      data.data[0].attributes.brands.data[0].attributes.discount.value
        ? calculateDiscountNumber(
            parseFloat(data.data[0].attributes.brands.data[0].attributes.price),
            data.data[0].attributes.brands.data[0].attributes.discount.type,
            data.data[0].attributes.brands.data[0].attributes.discount.value
          ) * qtyResult
        : parseFloat(data.data[0].attributes.brands.data[0].attributes.price) *
          qtyResult;
    // Accumulate Qty End

    const result = value_accumulate;
    setPriceFinishedProduct(result);
  };

  const decrement = () => {
    let minQty = 1;
    if (quantity > minQty) {
      setQuantity(quantity - 1);
      const qtyResult = quantity - 1;

      // Accumulate Qty Start
      const value_accumulate =
        data.data[0].attributes.brands.data[0].attributes.discount?.type &&
        data.data[0].attributes.brands.data[0].attributes.discount.value
          ? calculateDiscountNumber(
              parseFloat(
                data.data[0].attributes.brands.data[0].attributes.price
              ),
              data.data[0].attributes.brands.data[0].attributes.discount.type,
              data.data[0].attributes.brands.data[0].attributes.discount.value
            ) * qtyResult
          : parseFloat(
              data.data[0].attributes.brands.data[0].attributes.price
            ) * qtyResult;
      // Accumulate Qty End

      const result = value_accumulate;

      setPriceFinishedProduct(result);
    }
  };

  if (typeof window !== "undefined") {
    storedImageData = JSON.parse(
      getDecryptedLocalStorage(localStorage.getItem("dataCart")) || "null"
    );
  }

  const changeMainImage = (index: number) => {
    setMainImageIndex(index);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(value > 0 ? value : 1);
  };

  const checkFlashSaleProduct = () => {
    const find = flashsale?.data?.attributes?.products?.data?.find(
      (item) => item.attributes.slug === data.data[0].attributes.slug
    );
    setIsFlashSale(!!find); // Use !! to convert value to boolean
  };

  useEffect(() => {
    checkFlashSaleProduct();
  }, []); // Empty dependency array to run it once when the component mounts

  const addToCart = () => {
    const result = {
      quantity,
      original_price:
        data.data[0].attributes.brands.data[0].attributes.discount?.type &&
        data.data[0].attributes.brands.data[0].attributes.discount.value
          ? calculateDiscountNumber(
              parseFloat(
                data.data[0].attributes.brands.data[0].attributes.price
              ),
              data.data[0].attributes.brands.data[0].attributes.discount.type,
              data.data[0].attributes.brands.data[0].attributes.discount.value
            ) * 1
          : parseFloat(data.data[0].attributes.brands.data[0].attributes.price),
      total_price: parseFloat(priceFinishedProduct.toString()),
      detail_product: data,
    };

    let resultSendData;
    if (storedImageData) resultSendData = [result, ...storedImageData];
    else resultSendData = [result];

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "dataCart",
        setEncryptedLocalStorage(JSON.stringify(resultSendData)) ?? ""
      );
    }

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Product ditambahkan ke-cart.",
    });

    window.location.href = "/cart";
  };

  return (
    <div className={`${cx(poppins, poppins.className)}`}>
      <div className="container mx-auto">
        <div className="md:mx-10 mx-4">
          <div
            className={`bg-[#F3F4F6] md:p-4 flex justify-start ${cx(
              poppins,
              poppins.className
            )} text-[#5BC7E1]`}
          >
            <div className="flex items-center p-4 text-sm">
              <Link
                className="font-medium hover:text-[#2FD1C1] me-2"
                href={"/"}
              >
                <p className="title-custom-2">Beranda</p>
              </Link>
              /
              {data.data[0].attributes.brands.data[0].attributes.categories
                ?.data?.length ? (
                <Link
                  className="font-medium hover:text-[#2FD1C1] mx-2"
                  href={`/category/${data.data[0].attributes.brands.data[0].attributes.categories.data[0].attributes.slug}`}
                >
                  <p className="title-custom-2">
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
                  <p className="title-custom-2">
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
                <p className="title-custom-2">
                  {data.data[0].attributes.brands.data[0].attributes.title}
                </p>
              </Link>
              /
              <Link
                className="font-medium hover:text-[#2FD1C1] mx-2"
                href={`#`}
              >
                <p className="title-custom-2">
                  {data.data[0].attributes.title}
                </p>
              </Link>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-full w-full bg-white p-6 shadow-lg mb-4">
              <div className="lg:flex">
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
                      {data.data[0].attributes.images.data?.map(
                        (item, index) => (
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
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="h-full md:px-6  lg:w-1/2">
                  <div className="w-full font-medium">
                    {isFlashSale && <FlashSaleDetailProduct {...flashsale} />}
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
                                data.data[0].attributes.brands.data[0]
                                  .attributes.price
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
                              ? data.data[0].attributes.brands.data[0]
                                  .attributes.discount?.type
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
                            <td>
                              :{" "}
                              {data.data[0].attributes?.wallpaper_by_colors
                                ?.data[0]?.attributes?.title || "-"}
                            </td>
                          </tr>
                          <tr>
                            <td>Motif</td>
                            <td>
                              :{" "}
                              {data.data[0].attributes?.wallpaper_by_styles
                                ?.data[0]?.attributes?.title || "-"}
                            </td>
                          </tr>
                          <tr>
                            <td>Designer</td>
                            <td>
                              :{" "}
                              {data.data[0].attributes?.wallpaper_by_designers
                                ?.data[0]?.attributes?.title || "-"}
                            </td>
                          </tr>
                          <tr>
                            <td className="w-[120px] md:w-[200px]">
                              Ukuran Per Lembar
                            </td>
                            <td>
                              : L=
                              {
                                data.data[0].attributes.brands.data[0]
                                  .attributes.size_width
                              }
                              cm x P=
                              {
                                data.data[0].attributes.brands.data[0]
                                  .attributes.size_height
                              }
                              cm
                            </td>
                          </tr>
                          <tr>
                            <td>Ketebalan</td>
                            <td>
                              :{" "}
                              {
                                data.data[0].attributes.brands.data[0]
                                  .attributes.thickness
                              }
                              mm
                            </td>
                          </tr>
                          <tr>
                            <td>Isi Per Box</td>
                            <td>
                              :{" "}
                              {
                                data.data[0].attributes?.brands?.data[0]
                                  ?.attributes?.itemsPerBox
                              }
                              /{" "}
                              {
                                data.data[0].attributes?.brands?.data[0]
                                  ?.attributes?.sheetsPerUnit
                              }{" "}
                            </td>
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
                  <div className="flex justify-between mt-2">
                    <div></div>
                    <button className="shadow-lg flex flex-col items-center justify-center bg-gradient-to-r from-[#FF0000] to-red-700 rounded-md md:px-4 md:py-2 p-1 text-white border-[1px] border-white">
                      <p className="font-bold">
                        {data.data[0].attributes.brands.data[0].attributes
                          .discount?.type == "discount_percentage"
                          ? `${data.data[0].attributes.brands.data[0].attributes.discount?.value}%`
                          : formatNumberToLetter(
                              data.data[0].attributes.brands.data[0].attributes
                                .discount?.value
                                ? parseFloat(
                                    data.data[0].attributes.brands.data[0]
                                      .attributes.discount?.value
                                  )
                                : 0
                            )}
                      </p>
                      <p className="text-xs uppercase font-medium">Off</p>
                    </button>
                  </div>
                  <div className="flex justify-between my-6">
                    <div className="flex items-center">
                      <p className="text-xl text-blue-400">
                        Total Harga Dipesan
                      </p>
                    </div>
                    <div className="text-xl text-blue-400">
                      {formatRupiah(priceFinishedProduct)}
                    </div>
                  </div>
                  {/* Tambahkan Quantity dan Tombol Tambah ke Keranjang */}
                  <div className="my-4 flex items-center space-x-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        className="px-3 py-1 border-r"
                        onClick={decrement}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="w-12 text-center focus:outline-none"
                        value={quantity}
                        onChange={handleQuantityChange}
                        disabled
                      />
                      <button
                        className="px-3 py-1 border-l"
                        onClick={increment}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={addToCart}
                      className="bg-blue-400 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition md:text-md text-sm"
                    >
                      Tambahkan ke Keranjang
                    </button>
                  </div>
                  <div className="mt-10 flex-col bg-gray-100 p-4 text-sm">
                    <h1 className="mb-4 font-medium">Deskripsi</h1>
                    <hr />
                    <div className="mt-2"></div>
                    <MarkdownComponent
                      markdown={data.data[0].attributes.desc}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 ">
                <div className="text-center mb-2">
                  <h1 className="font-medium text-[34px] lucida-bright">
                    Produk Terkait
                  </h1>
                </div>
                <div className="grid gap-4 lg:grid-cols-4 grid-cols-2">
                  {data.data[0].attributes.brands.data.length &&
                    data.data[0].attributes.brands.data[0].attributes.products?.data
                      .filter(
                        (itemData) =>
                          itemData.attributes.slug !==
                          data.data[0].attributes.slug
                      )
                      .slice(0, 6)
                      .map((item, index) => (
                        <Link href={item.attributes?.slug || ""} key={index}>
                          <div className="relative mt-4 overflow-hidden cursor-pointer">
                            {item.attributes?.images?.data[0]?.attributes
                              ?.url && (
                              <Image
                                src={`${STRAPI_URL}${item.attributes.images.data[0].attributes.url}`}
                                width={400}
                                height={400}
                                alt="wall"
                                className="w-full md:h-[284px] h-[135px] object-cover transform transition-transform duration-500 hover:scale-110"
                              />
                            )}
                          </div>
                          <div>
                            <div className="w-full">
                              <div className="bg-white">
                                <h3 className="font-bold lucida-bright p-2 border-[1px] border-[#A5A5A5] lg:text-[18px] text-[10px] text-center">
                                  {item.attributes.title}
                                </h3>
                                <div
                                  className={`${cx(
                                    poppins,
                                    poppins.className
                                  )} flex justify-between items-center p-2 border-b-[1px] border-l-[1px] border-r-[1px] border-[#A5A5A5]`}
                                >
                                  <div className="md:text-xs text-[9px] text-[#474747]">
                                    <p>Ukuran</p>
                                    <table>
                                      <tbody>
                                        <tr
                                          className={
                                            item?.attributes?.brands?.data[0]
                                              ?.attributes?.thickness
                                              ? ""
                                              : "hidden"
                                          }
                                        >
                                          <td>Ketebalan</td>
                                          <td>
                                            :{" "}
                                            {
                                              item?.attributes?.brands?.data[0]
                                                ?.attributes.thickness
                                            }{" "}
                                            mm
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Lebar</td>
                                          <td>
                                            :{" "}
                                            {
                                              item?.attributes?.brands?.data[0]
                                                ?.attributes.size_width
                                            }{" "}
                                            cm
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Panjang</td>
                                          <td>
                                            :{" "}
                                            {
                                              item?.attributes?.brands?.data[0]
                                                ?.attributes.size_height
                                            }{" "}
                                            cm
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  {item?.attributes?.brands?.data[0]?.attributes
                                    ?.discount ? (
                                    <>
                                      <div className="shadow-lg flex flex-col items-center justify-center bg-gradient-to-r from-[#FF0000] to-red-700 rounded-md md:px-4 md:py-2 p-1 text-white border-[1px] border-white">
                                        <p className="font-bold">
                                          {item?.attributes?.brands?.data[0]
                                            ?.attributes?.discount?.type ==
                                          "discount_percentage"
                                            ? `${item?.attributes?.brands?.data[0]?.attributes?.discount?.value}%`
                                            : formatNumberToLetter(
                                                item?.attributes?.brands
                                                  ?.data[0]?.attributes
                                                  ?.discount?.value
                                                  ? parseFloat(
                                                      item.attributes.brands
                                                        .data[0].attributes
                                                        .discount?.value
                                                    )
                                                  : 0
                                              )}
                                        </p>
                                        <p className="text-xs uppercase font-medium">
                                          Off
                                        </p>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="md:text-sm text-[10px] font-semibold flex items-center flex-col text-white bg-transparent lg:px-4 lg:py-3 px-2 py-1 rounded-full lucida-bright">
                                      <p className="text-transparent">Disc</p>
                                      <p>-</p>
                                    </div>
                                  )}
                                </div>
                                <div
                                  className={`${cx(
                                    poppins,
                                    poppins.className
                                  )}  p-2 border-b-[1px] border-l-[1px] border-r-[1px] border-[#A5A5A5]`}
                                >
                                  {item?.attributes?.brands?.data[0]?.attributes
                                    ?.pricePerMeter ? (
                                    <div className="flex justify-between items-center">
                                      <div></div>
                                      <p className="md:text-sm text-[9.5px] font-medium">
                                        {
                                          item?.attributes?.brands?.data[0]
                                            ?.attributes.pricePerMeter
                                        }
                                      </p>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  <div className="flex justify-between items-center">
                                    <div className="text-sm">
                                      {/* START */}
                                      <div
                                        className={`${
                                          item?.attributes?.brands?.data[0]
                                            ?.attributes?.discount
                                            ? ""
                                            : "hidden"
                                        } flex`}
                                      >
                                        <p className="text-[#FF0000] line-through md:text-lg text-[9.5px]">
                                          {formatRupiah(
                                            parseFloat(
                                              item?.attributes?.brands?.data[0]
                                                ?.attributes?.price
                                            )
                                          )}
                                        </p>
                                      </div>
                                      {/* END */}
                                    </div>
                                    <div className="text-sm">
                                      <div>
                                        <p className="md:text-lg text-[9.5px] font-medium text-[#474747]">
                                          {!item?.attributes?.brands?.data[0]
                                            ?.attributes?.discount &&
                                            formatRupiah(
                                              parseFloat(
                                                item?.attributes?.brands
                                                  ?.data[0]?.attributes?.price
                                              )
                                            )}
                                          {calculateDiscount(
                                            parseFloat(
                                              item?.attributes?.brands?.data[0]
                                                ?.attributes?.price
                                            ),
                                            item?.attributes?.brands?.data[0]
                                              ?.attributes?.discount?.type
                                              ? item?.attributes?.brands
                                                  ?.data[0]?.attributes
                                                  ?.discount?.type
                                              : "",
                                            item?.attributes?.brands?.data[0]
                                              ?.attributes?.discount?.value
                                              ? parseFloat(
                                                  item?.attributes?.brands
                                                    ?.data[0]?.attributes
                                                    ?.discount?.value
                                                )
                                              : 0
                                          )}{" "}
                                          /{" "}
                                          <span className="capitalize">
                                            {item?.attributes?.brands?.data[0]
                                              ?.attributes?.unit
                                              ? String(
                                                  item?.attributes?.brands
                                                    ?.data[0]?.attributes?.unit
                                                ).toLowerCase()
                                              : ""}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
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
