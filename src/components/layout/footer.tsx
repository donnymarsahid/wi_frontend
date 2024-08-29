"use client";

import { buildPathWithQueryParams } from "@/utils/queryParams";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";
import { poppins } from "@/app/fonts";

export const Footer = () => {
  const categories = [
    {
      link: "#",
      title: "Wallpaper",
    },
    {
      link: "#",
      title: "Wallpanel",
    },
    {
      link: "#",
      title: "Lantai Vinyl & SPC",
    },
    {
      link: "#",
      title: "Kaca Sanblast",
    },
    {
      link: "#",
      title: "Karpet & Rumput Sintetis",
    },
    {
      link: "#",
      title: "Tirai Blind",
    },
    {
      link: "#",
      title: "Lem & Sealant",
    },
    {
      link: "#",
      title: "Aksesoris Lantai Vinyl",
    },
    {
      link: "#",
      title: "Decking Outdoor",
    },
  ];
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
                  Ruko The Metro Broadway Blok 6 JK, Jalan Mandara Permai VII,
                  Kapuk Muara, Penjaringan, Kota Jkt Utara, DKI Jakarta 14460,
                  Indonesia
                </p>
                <h1 className="font-bold mt-4 text-xs md:text-sm lg:text-lg text-[#5BC0DE]">
                  Kantor cabang
                </h1>
                <p className="text-[10px] md:text-xs">
                  Jl. Otto Iskandar Dinata No.463, Nyengseret, Kec. Astanaanyar,
                  Kota Bandung, Jawa Barat 40242
                </p>
                <h1 className="font-bold mt-4 text-xs md:text-sm lg:text-lg text-[#5BC0DE]">
                  021 3005 1603
                </h1>
                <p className="text-[10px] md:text-xs">
                  wallpaperindonesia.adm@gmail.com
                </p>
                <h1 className="font-bold mt-4 text-xs md:text-sm lg:text-lg text-[#5BC0DE] flex flex-col lg:hidden">
                  Jam Operasional
                </h1>
                <div className="text-xs flex flex-col lg:hidden">
                  <p className="text-[10px] md:text-xs">Senin s/d Minggu</p>
                  <p className="text-[10px] md:text-xs">09:00 - 17:00</p>
                  <p className="text-[10px] md:text-xs">Tanggal Merah Libur</p>
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
                      <p className="text-[10px] md:text-xs">
                        Keranjang Belanja
                      </p>
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
                    <p className="text-[10px] md:text-xs">Login</p>
                  </li>
                  <li className="mb-4">
                    <p className="text-[10px] md:text-xs">Keranjang Belanja</p>
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
          <div className="w-full ps-4">
            <div>
              <h1 className="uppercase font-bold text-xs md:text-sm lg:text-lg text-[#5BC0DE]">
                KATEGORI
              </h1>
              <div className="mt-4">
                <ul>
                  {categories.map((item, index) => (
                    <li className="mb-4" key={index}>
                      <Link href={item.link}>
                        <p className="text-[10px] md:text-xs">{item.title}</p>
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
          <p>Copyright © 2024 wallpaperindonesia.com All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
};
