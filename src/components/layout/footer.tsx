"use client";

import { buildPathWithQueryParams } from "@/utils/queryParams";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import { FooterProps } from "@/types/footer";
import { CategoryProps } from "@/types/categories";

type SectionFooterProps = {
  footer: FooterProps;
  categories: CategoryProps;
};

export const Footer = ({ footer, categories }: SectionFooterProps) => {
  return (
    <>
      <footer
        className={` flex border-t-2 border-gray-100 bg-[#E4E4E4] p-4 py-10 text-xs lg:text-sm ${cx(
          poppins,
          poppins.className
        )}`}
      >
        <div className="flex justify-between container mx-auto">
          <div className="w-full ps-4">
            <div>
              <h1 className="uppercase font-bold text-xs md:text-sm lg:text-lg text-[#5BC0DE]">
                Informasi Kontak
              </h1>
              <div className="mt-4">
                <h1 className="font-bold mt-4 text-xs md:text-sm lg:text-lg text-[#5BC0DE]">
                  Kantor Pusat
                </h1>
                <p className="md:text-xs text-[10px]">
                  {footer.data.attributes.office_center}
                </p>
                <h1 className="font-bold mt-4 text-xs md:text-sm lg:text-lg text-[#5BC0DE]">
                  Kantor cabang
                </h1>
                <p className="text-[10px] md:text-xs">
                  {footer.data.attributes.office_branch}
                </p>
                <h1 className="font-bold mt-4 text-xs md:text-sm lg:text-lg text-[#5BC0DE]">
                  <Link
                    href={`tel:${footer.data.attributes.office_telp.replace(
                      /\s+/g,
                      ""
                    )}`}
                    target="blank"
                  >
                    {footer.data.attributes.office_telp}
                  </Link>
                </h1>
                <p className="text-[10px] md:text-xs">
                  {footer.data.attributes.email}
                </p>
                <h1 className="font-bold mt-4 text-xs md:text-sm lg:text-lg text-[#5BC0DE] flex flex-col lg:hidden">
                  Jam Operasional
                </h1>
                <div className="text-xs flex flex-col lg:hidden">
                  <p className="text-[10px] md:text-xs">
                    {footer.data.attributes.operating_hours}
                  </p>
                </div>
                <h1 className="uppercase font-bold text-xs md:text-sm lg:text-lg text-[#5BC0DE] md:hidden mt-4">
                  AKUN SAYA
                </h1>
                <div className="mt-4 md:hidden">
                  <ul>
                    <li className="mb-4">
                      <p className="text-[10px] md:text-xs"></p>
                    </li>
                    <li className="mb-4">
                      <Link href={"/cart"} className="text-[10px] md:text-xs">
                        Keranjang Belanja
                      </Link>
                    </li>
                    <li className="mb-4">
                      <p className="text-[10px] md:text-xs">
                        Konfirmasi Pembayaran
                      </p>
                    </li>
                    <li className="mb-4">
                      <p className="text-[10px] md:text-xs">
                        Konfirmasi Terima Barang
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full ps-4 hidden lg:flex">
            <div>
              <h1 className="uppercase font-bold text-xs md:text-sm lg:text-lg text-[#E4E4E4]">
                -
              </h1>
              <div className="mt-4">
                <h1 className="font-bold mt-4 text-xs md:text-sm lg:text-lg text-[#5BC0DE]">
                  Jam Operasional
                </h1>
                <div className="text-[10px] md:text-xs">
                  <p>Senin s/d Minggu</p>
                  <p>09:00 - 17:00</p>
                  <p>Tanggal Merah Libur</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full ps-4 hidden md:block">
            <div>
              <h1 className="uppercase font-bold text-xs md:text-sm lg:text-lg text-[#5BC0DE]">
                AKUN SAYA
              </h1>
              <div className="mt-4">
                <ul>
                  <li className="mb-4">
                    <Link
                      href={"#"}
                      className="text-[10px] hover:text-[#44CBEB] md:text-xs"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      href={"/cart"}
                      className="text-[10px] hover:text-[#44CBEB] md:text-xs"
                    >
                      Keranjang Belanja
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      href={"#"}
                      className="text-[10px] hover:text-[#44CBEB] md:text-xs"
                    >
                      Konfirmasi Pembayaran
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      href={"#"}
                      className="text-[10px] hover:text-[#44CBEB] md:text-xs"
                    >
                      Konfirmasi Terima Barang
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full ps-4">
            <div>
              <h1 className="uppercase font-bold text-xs md:text-sm lg:text-lg text-[#5BC0DE]">
                KATEGORI
              </h1>
              <div className="mt-4">
                <ul>
                  {categories.data.map((item, index) => (
                    <li className="mb-4" key={index}>
                      <Link
                        href={`/category/${
                          item.attributes.keyPageCondition
                            ? item.attributes.keyPageCondition
                            : item.attributes.slug
                        }`}
                      >
                        <p className="text-[10px] md:text-xs hover:text-[#44CBEB]">
                          {item.attributes.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className={`${cx(poppins, poppins.className)} p-4 py-10`}>
        <div className="mx-auto container md:text-sm text-xs">
          <p> {footer.data.attributes.copyright}</p>
        </div>
      </div>
    </>
  );
};
