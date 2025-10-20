// src/app/wallpapers/page.tsx
"use client";

import { postData } from "@/app/utils/fetching";
import CardProductToDetailFiltered from "@/components/atoms/cardProductToDetailFiltered";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import cx from "classnames";
import { poppins } from "@/app/fonts";

type tParams = Promise<{ slug: string }>;
type tSecondParams = Promise<{
  category: string;
  title: string;
}>;

/* ---------- Types ---------- */
type StatItem = { name: string; count: number };
type StatisticResponse = {
  "wallpaper-by-color"?: StatItem[];
  "wallpaper-by-style"?: StatItem[];
  "wallpaper-by-designer"?: StatItem[];
} | null;

type FilterAddOn = { category: string; value: string };
type FilterRequest = {
  category: string;
  value: string[]; // now array
  filterAddOn?: FilterAddOn[];
};

type Product = {
  id: number;
  title?: string;
  name?: string;
  slug?: string;
  thumbnail?: string;
  // add other fields if needed
};

type FilterResponse = {
  base?: { category: string; value: string[]; totalProducts?: number };
  filters?: FilterAddOn[];
  products?: Product[];
} | null;

/* ---------- Simple Card Placeholder (replace with your Card component) ---------- */
const CardProductToDetail: React.FC<{ product: Product }> = ({ product }) => {
  return <CardProductToDetailFiltered {...product} />;
};

/* ---------- Page Component ---------- */
export default function WallpapersPage({
  params,
  searchParams,
}: {
  params?: any;
  searchParams?: any;
}) {
  // Assume category and title (fallback value) come from route or search params
  const category = searchParams?.category as string;
  const title = searchParams?.title as string; // fallback default

  /* ---------- local state ---------- */
  const [wallpaperStatistics, setWallpaperStatistics] =
    useState<StatisticResponse>(null);
  const [wallpaperFilters, setWallpaperFilters] =
    useState<FilterResponse>(null);

  const [selectedColors, setSelectedColors] = useState<string[]>(
    category === "wallpaper-by-color" ? [title] : []
  );
  const [selectedMotifs, setSelectedMotifs] = useState<string[]>(
    category === "wallpaper-by-style" ? [title] : []
  );
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>(
    category === "wallpaper-by-designer" ? [title] : []
  );

  const [isOpenColor, setIsOpenColor] = useState(
    category === "wallpaper-by-color" ? true : false
  );
  const [isOpenMotif, setIsOpenMotif] = useState(
    category === "wallpaper-by-style" ? true : false
  );
  const [isOpenDesigner, setIsOpenDesigner] = useState(
    category === "wallpaper-by-designer" ? true : false
  );

  const toggleDropdownColor = () => setIsOpenColor(!isOpenColor);
  const toggleDropdownMotif = () => setIsOpenMotif(!isOpenMotif);
  const toggleDropdownDesigner = () => setIsOpenDesigner(!isOpenDesigner);

  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingFilter, setLoadingFilter] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---------- helpers ---------- */
  const buildFilterPayload = useCallback((): FilterRequest => {
    let mainValues: string[] = [];

    if (category === "wallpaper-by-style") {
      mainValues = selectedMotifs.length ? selectedMotifs : [title];
    } else if (category === "wallpaper-by-color") {
      mainValues = selectedColors.length ? selectedColors : [title];
    } else if (category === "wallpaper-by-designer") {
      mainValues = selectedDesigners.length ? selectedDesigners : [title];
    } else {
      mainValues = [title];
    }

    const filterAddOn: FilterAddOn[] = [];

    if (category !== "wallpaper-by-color") {
      selectedColors.forEach((v) =>
        filterAddOn.push({ category: "wallpaper-by-color", value: v })
      );
    }
    if (category !== "wallpaper-by-style") {
      selectedMotifs.forEach((v) =>
        filterAddOn.push({ category: "wallpaper-by-style", value: v })
      );
    }
    if (category !== "wallpaper-by-designer") {
      selectedDesigners.forEach((v) =>
        filterAddOn.push({ category: "wallpaper-by-designer", value: v })
      );
    }

    return {
      category,
      value: mainValues,
      filterAddOn,
    };
  }, [category, selectedColors, selectedDesigners, selectedMotifs, title]);

  /* ---------- fetch statistics (once on mount) ---------- */
  const fetchStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const body = { category, value: title };
      const headers = {
        "Content-Type": "application/json",
      };

      const res = await postData({
        path: "wallpaper-statistics",
        body,
        headers: headers,
        method: "POST",
        isValidation: true,
      });
      setWallpaperStatistics(res);
    } catch (err) {
      console.error("fetchStats error:", err);
      setWallpaperStatistics(null);
    } finally {
      setLoadingStats(false);
    }
  }, [category, title]);

  /* ---------- fetch filters (debounced, called when selections change) ---------- */
  const fetchFilters = useCallback(
    async (opts?: { immediate?: boolean }) => {
      const run = async () => {
        setLoadingFilter(true);
        try {
          const payload = buildFilterPayload();
          const headers = {
            "Content-Type": "application/json",
          };

          const res = await postData({
            path: "wallpaper-filter",
            body: payload,
            headers,
            method: "POST",
            isValidation: true,
          });
          setWallpaperFilters(res);
        } catch (err) {
          console.error("fetchFilters error:", err);
          setWallpaperFilters(null);
        } finally {
          setLoadingFilter(false);
        }
      };

      if (opts?.immediate) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
          debounceRef.current = null;
        }
        await run();
        return;
      }

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        run();
        debounceRef.current = null;
      }, 350);
    },
    [buildFilterPayload]
  );

  /* ---------- handlers for checkboxes ---------- */
  const toggleInArray = (arr: string[], val: string) => {
    if (arr.includes(val)) return arr.filter((x) => x !== val);
    return [...arr, val];
  };

  const handleFilterChange = (color: string) =>
    setSelectedColors((prev) => toggleInArray(prev, color));
  const handleFilterMotifChange = (motif: string) =>
    setSelectedMotifs((prev) => toggleInArray(prev, motif));
  const handleFilterDesignerChange = (designer: string) =>
    setSelectedDesigners((prev) => toggleInArray(prev, designer));

  /* ---------- effects ---------- */
  // initial load stats + initial filter load
  useEffect(() => {
    fetchStats();
    // initial fetch filter based on defaults (no selection)
    fetchFilters({ immediate: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStats]); // only when fetchStats reference changes

  // whenever selections or category/title change -> fetch filters (debounced)
  useEffect(() => {
    fetchFilters();
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [
    selectedColors,
    selectedMotifs,
    selectedDesigners,
    category,
    title,
    fetchFilters,
  ]);

  /* ---------- UI ---------- */
  return (
    <div className={`mt-10 mb-10 ${cx(poppins, poppins.className)}`}>
      <div className="container mx-auto">
        <div className="md:mx-10 mx-4">
          {/* Breadcrumb */}
          <div className={`bg-[#F3F4F6]  text-[#5BC7E1]`}>
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
                <p className="title-custom-2">{title}</p>
              </Link>
            </div>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
            {/* Sidebar filters */}
            <aside className="col-span-1">
              {/* <div className="mb-4">
            <h3 className="text-lg font-semibold">Filters</h3>
          </div> */}

              {/* Selected chips */}
              <div className="mb-4 space-y-2">
                {[
                  ...selectedColors,
                  ...selectedMotifs,
                  ...selectedDesigners,
                ].map((s, i) => (
                  <div
                    key={s + i}
                    className="flex items-center justify-between bg-emerald-400 px-3 py-1 rounded"
                  >
                    <span className="text-white text-xs">{s}</span>
                    <button
                      className="text-white text-xs"
                      onClick={() => {
                        // remove from whichever array contains it
                        if (selectedColors.includes(s))
                          setSelectedColors((p) => p.filter((x) => x !== s));
                        if (selectedMotifs.includes(s))
                          setSelectedMotifs((p) => p.filter((x) => x !== s));
                        if (selectedDesigners.includes(s))
                          setSelectedDesigners((p) => p.filter((x) => x !== s));
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* COLOR */}
              <div>
                <div
                  className="flex items-center justify-between mb-2 cursor-pointer select-none"
                  onClick={toggleDropdownColor}
                >
                  <h4 className="font-semibold">COLOR</h4>
                  {isOpenColor ? (
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
                  ) : (
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
                </div>

                {isOpenColor && (
                  <div className="space-y-2 max-h-64 overflow-auto transition-all duration-300">
                    {loadingStats ? (
                      <div className="space-y-2 animate-pulse">
                        <div className="h-4 bg-gray-200 w-3/4 rounded" />
                        <div className="h-4 bg-gray-200 w-1/2 rounded" />
                      </div>
                    ) : (
                      wallpaperStatistics?.["wallpaper-by-color"]?.map(
                        (color: any) => (
                          <label
                            key={color.name}
                            className="flex items-center space-x-2 text-sm cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedColors.includes(color.name)}
                              onChange={() => handleFilterChange(color.name)}
                              className="form-checkbox"
                            />
                            <span>
                              {color.name} ({color.count})
                            </span>
                          </label>
                        )
                      ) ?? (
                        <div className="text-xs text-gray-400">No colors</div>
                      )
                    )}
                  </div>
                )}
              </div>
              <hr className="mb-4" />
              {/* MOTIF */}
              <div>
                <div
                  className="flex items-center justify-between mb-2 cursor-pointer select-none"
                  onClick={toggleDropdownMotif}
                >
                  <h4 className="font-semibold">MOTIF</h4>
                  {isOpenMotif ? (
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
                  ) : (
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
                </div>

                {isOpenMotif && (
                  <div className="space-y-2 max-h-64 overflow-auto transition-all duration-300">
                    {loadingStats ? (
                      <div className="space-y-2 animate-pulse">
                        <div className="h-4 bg-gray-200 w-3/4 rounded" />
                        <div className="h-4 bg-gray-200 w-1/2 rounded" />
                      </div>
                    ) : (
                      wallpaperStatistics?.["wallpaper-by-style"]?.map(
                        (m: any) => (
                          <label
                            key={m.name}
                            className="flex items-center space-x-2 text-sm cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedMotifs.includes(m.name)}
                              onChange={() => handleFilterMotifChange(m.name)}
                              className="form-checkbox"
                            />
                            <span>
                              {m.name} ({m.count})
                            </span>
                          </label>
                        )
                      ) ?? (
                        <div className="text-xs text-gray-400">No motifs</div>
                      )
                    )}
                  </div>
                )}
              </div>
              <hr className="mb-4" />

              {/* DESIGNER */}
              <div>
                <div
                  className="flex items-center justify-between mb-2 cursor-pointer select-none"
                  onClick={toggleDropdownDesigner}
                >
                  <h4 className="font-semibold">DESIGNER</h4>
                  {isOpenDesigner ? (
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
                  ) : (
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
                </div>

                {isOpenDesigner && (
                  <div className="space-y-2 max-h-64 overflow-auto transition-all duration-300">
                    {loadingStats ? (
                      <div className="space-y-2 animate-pulse">
                        <div className="h-4 bg-gray-200 w-3/4 rounded" />
                      </div>
                    ) : (
                      wallpaperStatistics?.["wallpaper-by-designer"]?.map(
                        (d: any) => (
                          <label
                            key={d.name}
                            className="flex items-center space-x-2 text-sm cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedDesigners.includes(d.name)}
                              onChange={() =>
                                handleFilterDesignerChange(d.name)
                              }
                              className="form-checkbox"
                            />
                            <span>
                              {d.name} ({d.count})
                            </span>
                          </label>
                        )
                      ) ?? (
                        <div className="text-xs text-gray-400">
                          No designers
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
              <hr className="mb-4" />
            </aside>

            {/* Product grid */}
            <main className="col-span-2">
              {/* <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Wallpapers</h2>
            <div>
              <button
                className="px-3 py-1 border rounded mr-2"
                onClick={() => {
                  // reset selection
                  setSelectedColors([]);
                  setSelectedMotifs([]);
                  setSelectedDesigners([]);
                  // immediate fetch
                  fetchFilters({ immediate: true });
                }}
              >
                Reset
              </button>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => fetchFilters({ immediate: true })}
              >
                Apply
              </button>
            </div>
          </div> */}

              {/* products */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loadingFilter ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-48 bg-gray-100 animate-pulse rounded"
                    />
                  ))
                ) : wallpaperFilters?.products &&
                  wallpaperFilters.products.length > 0 ? (
                  wallpaperFilters.products.map((p) => (
                    <CardProductToDetail key={p.id} product={p} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="text-gray-400">No products found</div>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
