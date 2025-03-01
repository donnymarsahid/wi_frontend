"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import "../../app/blockStyle.css";
import { BrandsProps } from "@/types/brands";
import CardProductToDetail from "../atoms/cardProductToDetail";
import Image from "next/image";
import { WallpaperByGeneralProps } from "@/types/wallpaperByGeneral";

type ListProductPageProps = {
  brands: BrandsProps;
  wallpaper_by_colors: WallpaperByGeneralProps;
  wallpaper_by_styles: WallpaperByGeneralProps;
  wallpaper_by_designers: WallpaperByGeneralProps;
  slug: string;
};

export default function List({
  brands,
  wallpaper_by_colors,
  wallpaper_by_styles,
  wallpaper_by_designers,
  slug,
}: ListProductPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedColors, setSelectedColors] = useState<string[]>([]); // State untuk filter warna
  const [selectedMotifs, setSelectedMotifs] = useState<string[]>([]);
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>([]);
  const productsPerPage = 16;

  const [isOpenColor, setIsOpenColor] = useState(false);
  const [isOpenMotif, setIsOpenMotif] = useState(false);
  const [isOpenDesigner, setIsOpenDesigner] = useState(false);

  const toggleDropdownColor = () => {
    setIsOpenColor(!isOpenColor);
  };
  const toggleDropdownMotif = () => {
    setIsOpenMotif(!isOpenMotif);
  };
  const toggleDropdownDesigner = () => {
    setIsOpenDesigner(!isOpenDesigner);
  };

  const products = brands.data[0].attributes.products.data
    .sort(
      (a, b) =>
        new Date(b.attributes.date).getTime() -
        new Date(a.attributes.date).getTime()
    )
    .filter((itemData) => itemData.attributes.available);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Fungsi untuk mengelola perubahan checkbox tanpa query params
  const handleFilterChange = (color: string) => {
    const currentFilters = [...selectedColors];
    if (currentFilters.includes(color)) {
      // Hapus filter jika sudah dipilih
      const updatedFilters = currentFilters.filter((c) => c !== color);
      setSelectedColors(updatedFilters);
    } else {
      // Tambahkan filter jika belum dipilih
      currentFilters.push(color);
      setSelectedColors(currentFilters);
    }
  };

  const handleFilterMotifChange = (motif: string) => {
    const currentFilters = [...selectedMotifs];
    if (currentFilters.includes(motif)) {
      const updatedFilters = currentFilters.filter((m) => m !== motif);
      setSelectedMotifs(updatedFilters);
    } else {
      currentFilters.push(motif);
      setSelectedMotifs(currentFilters);
    }
  };

  const handleFilterDesignerChange = (motif: string) => {
    const currentFilters = [...selectedDesigners];
    if (currentFilters.includes(motif)) {
      const updatedFilters = currentFilters.filter((m) => m !== motif);
      setSelectedDesigners(updatedFilters);
    } else {
      currentFilters.push(motif);
      setSelectedDesigners(currentFilters);
    }
  };

  // Filter produk berdasarkan warna yang dipilih
  const filteredProducts = products.filter(
    (product: any) =>
      (!selectedColors.length ||
        product.attributes.wallpaper_by_colors.data.some((color: any) =>
          selectedColors.includes(color.attributes.title)
        )) &&
      (!selectedMotifs.length ||
        product.attributes.wallpaper_by_styles.data.some((motif: any) =>
          selectedMotifs.includes(motif.attributes.title)
        )) &&
      (!selectedDesigners.length ||
        product.attributes.wallpaper_by_designers.data.some((motif: any) =>
          selectedDesigners.includes(motif.attributes.title)
        ))
  );

  useEffect(() => {
    // console.log(selectedColors, "selectedColors");
    // console.log(selectedMotifs, "selectedMotifs");
    // console.log(selectedDesigners, "selectedDesigners");
  }, [selectedColors, selectedMotifs, selectedDesigners]);

  return (
    <div className="mt-10 mb-10">
      <div className="container mx-auto">
        <div className="md:mx-10 mx-4">
          {/* Breadcrumb */}
          <div
            className={`bg-[#F3F4F6] ${cx(
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
              {brands.data[0].attributes.categories?.data?.length ? (
                <Link
                  className="font-medium hover:text-[#2FD1C1] mx-2"
                  href={`/category/${
                    brands.data[0].attributes.categories.data[0].attributes
                      .keyPageCondition
                      ? `${brands.data[0].attributes.categories.data[0].attributes.keyPageCondition}--${brands.data[0].attributes.categories.data[0].attributes.slug}`
                      : brands.data[0].attributes.categories.data[0].attributes
                          .slug
                  }`}
                >
                  <p className="title-custom-2">
                    {
                      brands.data[0].attributes.categories.data[0].attributes
                        .title
                    }
                  </p>
                </Link>
              ) : (
                <Link
                  className="font-medium hover:text-[#2FD1C1] mx-2"
                  href={`/category/${
                    brands.data[0].attributes.sub_categories?.data[0]
                      ?.attributes?.categories?.data[0]?.attributes
                      ?.keyPageCondition
                      ? `${brands.data[0].attributes.sub_categories.data[0].attributes.categories.data[0].attributes.keyPageCondition}--${brands.data[0].attributes.sub_categories.data[0].attributes.categories.data[0].attributes.slug}`
                      : brands.data[0].attributes.sub_categories.data[0]
                          .attributes.categories.data[0].attributes.slug
                  }`}
                >
                  <p className="title-custom-2">
                    {
                      brands.data[0].attributes.sub_categories.data[0]
                        .attributes.categories.data[0].attributes.title
                    }
                  </p>
                </Link>
              )}
              /
              <Link className="font-medium hover:text-[#2FD1C1] mx-2" href="#">
                <p className="title-custom-2">
                  {brands.data[0].attributes.title}
                </p>
              </Link>
            </div>
          </div>

          {/* Filter Section */}
          <div
            className={`mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6 ${cx(
              poppins,
              poppins.className
            )}`}
          >
            {/* Filters */}
            <div className="md:col-span-1 col-span-3">
              <div className="mb-6">
                {selectedColors?.length
                  ? selectedColors.map((item, index) => (
                      <div
                        className="shadow-lg bg-[#10D3A2] px-4 py-1 flex justify-between mb-2"
                        key={index}
                      >
                        <p className="text-white">{item}</p>
                        <button
                          onClick={() => handleFilterChange(item)}
                          className="text-white"
                        >
                          X
                        </button>
                      </div>
                    ))
                  : ""}
                {selectedMotifs?.length
                  ? selectedMotifs.map((item, index) => (
                      <div
                        className="shadow-lg bg-[#10D3A2] px-4 py-1 flex justify-between mb-2"
                        key={index}
                      >
                        <p className="text-white">{item}</p>
                        <button
                          onClick={() => handleFilterMotifChange(item)}
                          className="text-white"
                        >
                          X
                        </button>
                      </div>
                    ))
                  : ""}
                {selectedDesigners?.length
                  ? selectedDesigners.map((item, index) => (
                      <div
                        className="shadow-lg bg-[#10D3A2] px-4 py-1 flex justify-between mb-2"
                        key={index}
                      >
                        <p className="text-white">{item}</p>
                        <button
                          onClick={() => handleFilterDesignerChange(item)}
                          className="text-white"
                        >
                          X
                        </button>
                      </div>
                    ))
                  : ""}
              </div>
              <div>
                <button
                  onClick={toggleDropdownColor}
                  className="flex justify-between w-full"
                >
                  <h3 className="text-lg font-semibold lucida-bright">COLOR</h3>
                  {!isOpenColor && (
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="24" height="24" fill="white" />
                      <path
                        d="M12 6V18"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 12H18"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {isOpenColor && (
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="24" height="24" fill="white" />
                      <path
                        d="M6 12H18"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                <hr className="my-2" />
                <div className="space-y-2 mb-4">
                  {isOpenColor &&
                    wallpaper_by_colors.data.map((color, index) => {
                      const filteredProducts =
                        color?.attributes?.products?.data?.filter(
                          (item) =>
                            item?.attributes?.brands?.data[0]?.attributes
                              ?.slug === slug
                        ) || [];

                      return (
                        <label
                          key={index}
                          className="flex items-center text-sm cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-0"
                            checked={selectedColors.includes(
                              color.attributes.title
                            )}
                            onChange={() =>
                              handleFilterChange(color.attributes.title)
                            }
                          />
                          <span className="ml-2 text-gray-700">
                            {color.attributes.title} ({filteredProducts?.length}
                            )
                          </span>
                        </label>
                      );
                    })}
                  {isOpenColor && !wallpaper_by_colors.data.length && (
                    <p className="text-center text-[12px] bg-gray-200 text-gray-600">
                      Color Kosong!
                    </p>
                  )}
                </div>
              </div>
              <div>
                <button
                  onClick={toggleDropdownMotif}
                  className="flex justify-between w-full"
                >
                  <h3 className="text-lg font-semibold lucida-bright">MOTIF</h3>
                  {!isOpenMotif && (
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="24" height="24" fill="white" />
                      <path
                        d="M12 6V18"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 12H18"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {isOpenMotif && (
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="24" height="24" fill="white" />
                      <path
                        d="M6 12H18"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                <hr className="my-2" />
                <div className="space-y-2 mb-4">
                  {isOpenMotif &&
                    wallpaper_by_styles.data.map((motif, index) => {
                      const filteredProducts =
                        motif?.attributes?.products?.data?.filter(
                          (item) =>
                            item?.attributes?.brands?.data[0]?.attributes
                              ?.slug === slug
                        ) || [];

                      return (
                        <label
                          key={index}
                          className="flex items-center text-sm cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-0"
                            checked={selectedMotifs.includes(
                              motif.attributes.title
                            )}
                            onChange={() =>
                              handleFilterMotifChange(motif.attributes.title)
                            }
                          />
                          <span className="ml-2 text-gray-700">
                            {motif.attributes.title} ({filteredProducts?.length}
                            )
                          </span>
                        </label>
                      );
                    })}
                  {isOpenMotif && !wallpaper_by_styles.data.length && (
                    <p className="text-center text-[12px] bg-gray-200 text-gray-600">
                      Motif Kosong!
                    </p>
                  )}
                </div>
              </div>
              <div>
                <button
                  onClick={toggleDropdownDesigner}
                  className="flex justify-between w-full"
                >
                  <h3 className="text-lg font-semibold lucida-bright">
                    DESIGNER
                  </h3>
                  {!isOpenDesigner && (
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="24" height="24" fill="white" />
                      <path
                        d="M12 6V18"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 12H18"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {isOpenDesigner && (
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="24" height="24" fill="white" />
                      <path
                        d="M6 12H18"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                <hr className="my-2" />
                <div className="space-y-2 mb-4">
                  {isOpenDesigner &&
                    wallpaper_by_designers.data.map((designer, index) => {
                      const filteredProducts =
                        designer?.attributes?.products?.data?.filter(
                          (item) =>
                            item?.attributes?.brands?.data[0]?.attributes
                              ?.slug === slug
                        ) || [];

                      return (
                        <label
                          key={index}
                          className="flex items-center text-sm cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-0"
                            checked={selectedDesigners.includes(
                              designer.attributes.title
                            )}
                            onChange={() =>
                              handleFilterDesignerChange(
                                designer.attributes.title
                              )
                            }
                          />
                          <span className="ml-2 text-gray-700">
                            {designer.attributes.title} (
                            {filteredProducts?.length})
                          </span>
                        </label>
                      );
                    })}
                  {isOpenDesigner && !wallpaper_by_designers.data.length && (
                    <p className="text-center text-[12px] bg-gray-200 text-gray-600">
                      Designer Kosong!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="col-span-3">
              <div className="grid gap-4 lg:grid-cols-3 grid-cols-2">
                {filteredProducts.map((item, index) => (
                  <div key={index}>
                    <CardProductToDetail {...item} />
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {!filteredProducts.length && (
                <div
                  className={`w-full flex justify-center my-24 ${cx(
                    poppins,
                    poppins.className
                  )}`}
                >
                  <div>
                    <Image
                      src="/assets/icons/empty.jpg"
                      width={200}
                      height={200}
                      alt="logo-horizontal"
                    />
                    <h1 className="text-center font-bold text-[#44CBEB]">
                      Data Kosong!
                    </h1>
                  </div>
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <nav>
                  <ul className="inline-flex space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li key={index}>
                        <button
                          onClick={() => paginate(index + 1)}
                          className={`px-4 py-2 border rounded-md ${
                            currentPage === index + 1
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-700"
                          }`}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
