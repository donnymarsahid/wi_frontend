"use client";

import { useState } from "react";
import Link from "next/link";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import "../../app/blockStyle.css";
import { BrandsProps } from "@/types/brands";
import CardProductToDetail from "../atoms/cardProductToDetail";

type ListProductPageProps = {
  brands: BrandsProps;
};

export default function List({ brands }: ListProductPageProps) {
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const productsPerPage = 16; // Jumlah produk per halaman

  const products = brands.data[0].attributes.products.data.sort(
    (a, b) =>
      new Date(b.attributes.date).getTime() -
      new Date(a.attributes.date).getTime()
  );

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Menghitung produk yang akan ditampilkan berdasarkan halaman
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mt-10 mb-10">
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
              href={"#"}
            >
              Brand
            </Link>
            <p>/</p>
            <Link
              className="ms-2 me-2 font-medium hover:text-[#2FD1C1] title-custom-2"
              href={`#`}
            >
              <p>{brands.data[0].attributes.title}</p>
            </Link>
          </div>

          <div className="mt-6">
            <div className="grid gap-4 lg:grid-cols-4 grid-cols-2">
              {currentProducts.map((item, index) => (
                <div key={index}>
                  <CardProductToDetail {...item} />
                </div>
              ))}
            </div>

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
  );
}
