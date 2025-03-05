import React from "react";
import Link from "next/link";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { buildPathWithQueryParams } from "@/utils/queryParams";

interface PaginationProps {
  path: string;
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  path,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const prevPage = buildPathWithQueryParams(path, {
    page: currentPage - 1,
  });
  const nextPage = buildPathWithQueryParams(path, {
    page: currentPage + 1,
  });

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // Selalu tampilkan halaman pertama

      if (currentPage > 3) pages.push("..."); // Tambahkan ellipsis jika perlu

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("..."); // Tambahkan ellipsis jika perlu

      pages.push(totalPages); // Selalu tampilkan halaman terakhir
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center space-x-2">
        {!isFirstPage && (
          <Link href={prevPage} className="px-3 py-2 rounded hover:bg-gray-200">
            <IoMdArrowDropleft className="w-5 h-5" />
          </Link>
        )}

        {generatePageNumbers().map((page, index) =>
          typeof page === "string" ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2">
              {" "}
              {page}{" "}
            </span>
          ) : (
            <Link
              key={`page-${page}`}
              href={buildPathWithQueryParams(path, { page })}
              className={`px-3 py-2 rounded hover:bg-gray-200 ${
                currentPage === page ? "bg-gray-300 font-bold" : ""
              }`}
            >
              {page}
            </Link>
          )
        )}

        {!isLastPage && (
          <Link href={nextPage} className="px-3 py-2 rounded hover:bg-gray-200">
            <IoMdArrowDropright className="w-5 h-5" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
