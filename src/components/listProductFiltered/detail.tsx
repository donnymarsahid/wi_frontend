"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
import { decodeText, replaceAmpersand, restoreAmpersand } from "@/lib/utils";

type ListProductPageProps = {
  products: ProductsProps;
  slug: string;
  searchParams: {
    page: string;
    multiple: string;
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

  const slugType = useMemo(() => slug.split("--")[1], [slug]);

  const [loadFetchWallpaperBy, setLoadFetchWallpaperBy] =
    useState<boolean>(true);

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

  const [isOpenColor, setIsOpenColor] = useState(
    slugType === "wallpaper-by-color" ? true : false
  );
  const [isOpenMotif, setIsOpenMotif] = useState(
    slugType === "wallpaper-by-style" ? true : false
  );
  const [isOpenDesigner, setIsOpenDesigner] = useState(
    slugType === "wallpaper-by-designer" ? true : false
  );

  const path = buildPathWithQueryParams(
    `/category/filtered/${slug}`,
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

  const updateQueryParams = (others: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (others.length > 0) {
      params.set("multiple", others.join(","));
    } else {
      params.delete("multiple");
    }

    router.push(`/category/filtered/${slug}?${params.toString()}`);
  };

  // Fungsi untuk mengelola perubahan checkbox tanpa query params
  const handleFilterChange = (color: string) => {
    const currentFilters = [...selectedColors];
    let updatedFilters: string[];

    if (currentFilters.includes(color)) {
      updatedFilters = currentFilters.filter((m) => m !== color);
    } else {
      updatedFilters = [...currentFilters, color];
    }

    setSelectedColors(updatedFilters);
    updateQueryParams(updatedFilters);
  };

  const handleFilterMotifChange = (motif: string) => {
    const currentFilters = [...selectedMotifs];
    let updatedFilters: string[];

    if (currentFilters.includes(motif)) {
      updatedFilters = currentFilters.filter((m) => m !== motif);
    } else {
      updatedFilters = [...currentFilters, motif];
    }

    setSelectedMotifs(updatedFilters);
    updateQueryParams(updatedFilters);
  };

  const handleFilterDesignerChange = (motif: string) => {
    const currentFilters = [...selectedDesigners];
    let updatedFilters: string[];

    if (currentFilters.includes(motif)) {
      updatedFilters = currentFilters.filter((m) => m !== motif);
    } else {
      updatedFilters = [...currentFilters, motif];
    }

    setSelectedDesigners(updatedFilters);
    updateQueryParams(updatedFilters);
  };

  function slugToText(slug: string): string {
    return slug
      .replace(/-/g, " ") // Ganti "-" dengan spasi
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Kapitalisasi setiap kata
  }

  // Buat flag untuk masing-masing state
  const isFirstRenderColors = useRef(true);
  const isFirstRenderMotifs = useRef(true);
  const isFirstRenderDesigners = useRef(true);

  useEffect(() => {
    if (isFirstRenderColors.current) {
      isFirstRenderColors.current = false;
      return; // Skip first render
    }

    const result = selectedColors.join(",");
    const href = buildPathWithQueryParams(path, {
      colors: result,
    });

    router.push(href);
  }, [selectedColors]);

  useEffect(() => {
    if (isFirstRenderMotifs.current) {
      isFirstRenderMotifs.current = false;
      return; // Skip first render
    }

    const result = selectedMotifs.join(",");
    const href = buildPathWithQueryParams(path, {
      styles: result,
    });

    router.push(href);
  }, [selectedMotifs]);

  useEffect(() => {
    if (isFirstRenderDesigners.current) {
      isFirstRenderDesigners.current = false;
      return; // Skip first render
    }

    const result = selectedDesigners.join(",");
    const href = buildPathWithQueryParams(path, {
      designers: result,
    });

    router.push(href);
  }, [selectedDesigners]);

  const convertField = () => {
    if (slugType === "wallpaper-by-color") return "wallpaper_by_colors";
    else if (slugType === "wallpaper-by-style") return "wallpaper_by_styles";
    else if (slugType === "wallpaper-by-designer")
      return "wallpaper_by_designers";
  };

  const fetchWallpaperBy = useCallback(async () => {
    setLoadFetchWallpaperBy(true);
    try {
      const queryWallpaperBy = {
        "fields[0]": "title",
        "fields[1]": "slug",
        "populate[products][fields][0]": "id",
        [`populate[products][populate][${convertField()}][fields][0]`]: "slug",
        "pagination[pageSize]": "50",
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
      setLoadFetchWallpaperBy(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadFetchWallpaperBy(false);
    }
  }, []);

  useEffect(() => {
    fetchWallpaperBy();
  }, []);

  useEffect(() => {
    const multiple = searchParams.multiple;

    if (multiple) {
      const selected = multiple.split(",");
      let result = [];
      for (const item of selected) {
        result.push(
          decodeText(restoreAmpersand(item.replace("symbolplus", "+")))
        );
      }
      if (slugType === "wallpaper-by-color") setSelectedColors(result);
      else if (slugType === "wallpaper-by-style") setSelectedMotifs(result);
      else if (slugType === "wallpaper-by-designer")
        setSelectedDesigners(result);
    } else {
      if (slugType === "wallpaper-by-color") setSelectedColors([]);
      else if (slugType === "wallpaper-by-style") setSelectedMotifs([]);
      else if (slugType === "wallpaper-by-designer") setSelectedDesigners([]);
    }
  }, [searchParams.multiple]);

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
                href={`/category/wallpaper--Wallpaper`}
              >
                <p className="title-custom-2">Wallpaper</p>
              </Link>
              /
              <Link className="font-medium hover:text-[#2FD1C1] mx-2" href="#">
                <p className="title-custom-2">
                  {slugToText(slug.split("--")[0])}
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
                        let filteredProducts =
                          color?.attributes?.products?.data?.length ?? 0;

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
                              {color.attributes.title} ({filteredProducts})
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
                        let filteredProducts =
                          motif?.attributes?.products?.data?.length ?? 0;
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
                              {motif.attributes.title} ({filteredProducts})
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
                        let filteredProducts =
                          designer?.attributes?.products?.data?.length ?? 0;

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
                              {designer.attributes.title} ({filteredProducts})
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
              {/* <div className="flex justify-center mt-6">
                <div>
                  <Pagination
                    currentPage={parseInt(searchParams.page ?? `1`)}
                    totalPages={products.meta?.pagination.pageCount}
                    path={path}
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
