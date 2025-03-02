import React from "react";
import Link from "next/link";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { usePathname } from "next/navigation";
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
  const isFirstPage = currentPage == 1;
  const isLastPage = currentPage == totalPages;

  const prevPage = buildPathWithQueryParams(path, {
    page: currentPage - 1,
  });
  const nextPage = buildPathWithQueryParams(path, {
    page: currentPage + 1,
  });

  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center">
        {!isFirstPage && (
          <div>
            <Link href={prevPage} className="px-4 py-2">
              <div className="px-3 py-2 rounded-l hover:bg-gray-200">
                <IoMdArrowDropleft className="w-5 h-5 bg-transparent" />
              </div>
            </Link>
          </div>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page) => (
          <div key={page}>
            <Link
              href={buildPathWithQueryParams(path, {
                page,
              })}
              className={`px-4 py-2 mx-1 rounded hover:bg-gray-200 ${
                currentPage == page ? "bg-gray-200" : ""
              }`}
            >
              {page}
            </Link>
          </div>
        ))}

        {!isLastPage && (
          <div>
            <Link href={nextPage} className="px-4 py-2">
              <div className="px-3 py-2 hover:bg-gray-200 rounded-r">
                <IoMdArrowDropright className="w-5 h-5 bg-transparent" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
