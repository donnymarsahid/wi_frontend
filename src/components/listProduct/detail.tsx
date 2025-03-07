"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import "../../app/blockStyle.css";
import { BrandsProps } from "@/types/brands";
import CardProductToDetail from "../atoms/cardProductToDetail";
import Image from "next/image";
import {
  WallpaperByGeneralProps,
  WallpaperByGeneralPropsDaum,
} from "@/types/wallpaperByGeneral";
import { ProductsProps } from "@/types/products";
import { buildPathWithQueryParams } from "@/utils/queryParams";
import Pagination from "../atoms/paginations";
import { useRouter } from "next/navigation";
import { getData } from "@/app/utils/fetching";

type ListProductPageProps = {
  products: ProductsProps;
  slug: string;
  searchParams: {
    page: string;
    key: string;
  };
};

export default function List({
  products,
  slug,
  searchParams,
}: ListProductPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedColors, setSelectedColors] = useState<string[]>([]); // State untuk filter warna
  const [selectedMotifs, setSelectedMotifs] = useState<string[]>([]);
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>([]);

  const [loadFetchWallpaperBy, setLoadFetchWallpaperBy] =
    useState<boolean>(false);

  // Wallpaper By
  const [wallpaper_by_colors, setWallpaper_by_colors] = useState<
    WallpaperByGeneralPropsDaum[] | null
  >([]);
  const [wallpaper_by_styles, setWallpaper_by_styles] = useState<
    WallpaperByGeneralPropsDaum[] | null
  >([]);
  const [wallpaper_by_designers, setWallpaper_by_designers] = useState<
    WallpaperByGeneralPropsDaum[] | null
  >([]);

  const router = useRouter();

  const [isOpenColor, setIsOpenColor] = useState(false);
  const [isOpenMotif, setIsOpenMotif] = useState(false);
  const [isOpenDesigner, setIsOpenDesigner] = useState(false);

  const path = buildPathWithQueryParams(
    `/category/product/${slug}`,
    searchParams
  );

  const toggleDropdownColor = () => {
    setIsOpenColor(!isOpenColor);
  };
  const toggleDropdownMotif = () => {
    setIsOpenMotif(!isOpenMotif);
  };
  const toggleDropdownDesigner = () => {
    setIsOpenDesigner(!isOpenDesigner);
  };

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

  function slugToText(slug: string): string {
    return slug
      .replace(/-/g, " ") // Ganti "-" dengan spasi
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Kapitalisasi setiap kata
  }

  useEffect(() => {
    const result = selectedColors.join(",");
    const href = buildPathWithQueryParams(path, {
      colors: result,
    });

    router.push(href);
  }, [selectedColors]);

  useEffect(() => {
    const result = selectedMotifs.join(",");
    const href = buildPathWithQueryParams(path, {
      styles: result,
    });

    router.push(href);
  }, [selectedMotifs]);

  useEffect(() => {
    const result = selectedDesigners.join(",");
    const href = buildPathWithQueryParams(path, {
      designers: result,
    });

    router.push(href);
  }, [selectedDesigners]);

  const fetchWallpaperBy = useCallback(async () => {
    setLoadFetchWallpaperBy(true);
    try {
      const queryWallpaperBy = {
        "fields[0]": "title", // Hanya ambil title
        "populate[products][fields][0]": "id", // Ambil ID produk
        "populate[products][populate][brands][fields][0]": "slug", // Hanya ambil slug dari brands
        "pagination[pageSize]": "1000",
      };

      const wallpaper_by_colors: WallpaperByGeneralProps = await getData({
        path: `wallpaper-by-colors`,
        params: queryWallpaperBy,
        revalidate: 0,
      });
      const wallpaper_by_styles: WallpaperByGeneralProps = await getData({
        path: `wallpaper-by-styles`,
        params: queryWallpaperBy,
        revalidate: 0,
      });
      const wallpaper_by_designers: WallpaperByGeneralProps = await getData({
        path: `wallpaper-by-designers`,
        params: queryWallpaperBy,
        revalidate: 0,
      });

      setWallpaper_by_colors(wallpaper_by_colors.data);
      setWallpaper_by_styles(wallpaper_by_styles.data);
      setWallpaper_by_designers(wallpaper_by_designers.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadFetchWallpaperBy(false);
    }
  }, []);

  useEffect(() => {
    fetchWallpaperBy();
  }, []);

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
              <Link
                className="font-medium hover:text-[#2FD1C1] mx-2 capitalize"
                href={searchParams?.key ? `/category/${searchParams.key}` : "#"}
              >
                <p className="title-custom-2">
                  {String(searchParams?.key ?? "").split("--")[0]}
                </p>
              </Link>
              /
              <Link className="font-medium hover:text-[#2FD1C1] mx-2" href="#">
                <p className="title-custom-2">{slugToText(slug)}</p>
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
            {loadFetchWallpaperBy ? (
              <div className="md:col-span-1 col-span-3 mt-[-30px] md:mt-0">
                <div className="space-y-5 animate-pulse w-full mt-4">
                  <div className="flex items-center w-full space-x-2">
                    <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-500 w-32"></div>
                    <div className="h-8 bg-gray-300 rounded-md dark:bg-gray-400 w-24"></div>
                    <div className="h-8 bg-gray-300 rounded-md dark:bg-gray-400 w-full"></div>
                  </div>
                  <div className="flex items-center w-full space-x-2">
                    <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-500 w-32"></div>
                    <div className="h-8 bg-gray-300 rounded-md dark:bg-gray-400 w-24"></div>
                    <div className="h-8 bg-gray-300 rounded-md dark:bg-gray-400 w-full"></div>
                  </div>
                  <div className="flex items-center w-full space-x-2">
                    <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-500 w-32"></div>
                    <div className="h-8 bg-gray-300 rounded-md dark:bg-gray-400 w-24"></div>
                    <div className="h-8 bg-gray-300 rounded-md dark:bg-gray-400 w-full"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="md:col-span-1 col-span-3">
                <div>
                  {selectedColors?.length
                    ? selectedColors.map((item, index) => (
                        <div
                          className="shadow-lg bg-[#10D3A2] px-4 py-1 flex justify-between mb-2"
                          key={index}
                        >
                          <p className="text-white md:text-sm text-xs">
                            {item}
                          </p>
                          <button
                            onClick={() => handleFilterChange(item)}
                            className="text-white md:text-sm text-xs"
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
                          <p className="text-white md:text-sm text-xs">
                            {item}
                          </p>
                          <button
                            onClick={() => handleFilterMotifChange(item)}
                            className="text-white md:text-sm text-xs"
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
                          <p className="text-white md:text-sm text-xs">
                            {item}
                          </p>
                          <button
                            onClick={() => handleFilterDesignerChange(item)}
                            className="text-white md:text-sm text-xs"
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
                    <h3 className="lg:text-lg text-sm font-semibold lucida-bright">
                      COLOR
                    </h3>
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
                      wallpaper_by_colors.map((color, index) => {
                        const filteredProducts =
                          color?.attributes?.products?.data?.filter(
                            (item) =>
                              item?.attributes?.brands?.data[0]?.attributes
                                ?.slug === slug
                          ) || [];

                        return (
                          <label
                            key={index}
                            className="flex items-center md:text-sm text-xs cursor-pointer"
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
                              {color.attributes.title} (
                              {filteredProducts?.length})
                            </span>
                          </label>
                        );
                      })}

                    {isOpenColor && !wallpaper_by_colors.length && (
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
                    <h3 className="lg:text-lg text-sm font-semibold lucida-bright">
                      MOTIF
                    </h3>
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
                      wallpaper_by_styles.map((motif, index) => {
                        const filteredProducts =
                          motif?.attributes?.products?.data?.filter(
                            (item) =>
                              item?.attributes?.brands?.data[0]?.attributes
                                ?.slug === slug
                          ) || [];

                        return (
                          <label
                            key={index}
                            className="flex items-center md:text-sm text-xs cursor-pointer"
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
                              {motif.attributes.title} (
                              {filteredProducts?.length})
                            </span>
                          </label>
                        );
                      })}
                    {isOpenMotif && !wallpaper_by_styles.length && (
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
                    <h3 className="lg:text-lg text-sm font-semibold lucida-bright">
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
                      wallpaper_by_designers.map((designer, index) => {
                        const filteredProducts =
                          designer?.attributes?.products?.data?.filter(
                            (item) =>
                              item?.attributes?.brands?.data[0]?.attributes
                                ?.slug === slug
                          ) || [];

                        return (
                          <label
                            key={index}
                            className="flex items-center md:text-sm text-xs cursor-pointer"
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
                    {isOpenDesigner && !wallpaper_by_designers.length && (
                      <p className="text-center text-[12px] bg-gray-200 text-gray-600">
                        Designer Kosong!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="col-span-3 mt-[-30px] md:mt-0">
              <div className="grid gap-4 lg:grid-cols-3 grid-cols-2">
                {products.data.map((item, index) => (
                  <div key={index}>
                    <CardProductToDetail {...item} />
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {!products.data.length && (
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
                <div>
                  <Pagination
                    currentPage={parseInt(searchParams.page ?? `1`)}
                    totalPages={products.meta?.pagination.pageCount}
                    path={path}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
