"use client";
import React, { ChangeEvent, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { buildPathWithQueryParams } from "@/utils/queryParams";

type SectionNavbarProps = {
  path: string;
  loginUrl?: string;
};

export default function Navbar({ path, loginUrl }: SectionNavbarProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const whatsapp = [
    {
      name: "Nita",
      phone: "083872239021",
    },
    {
      name: "Tika",
      phone: "083872239021",
    },
  ];

  const link = [
    {
      title: "Beranda",
      url: "#",
    },
    {
      title: "Produk",
      url: "#",
    },
    {
      title: "Berita/Inspirasi",
      url: "#",
    },
    {
      title: "Tentang Kami",
      url: "#",
    },
  ];

  const onSubmit = () => {
    const link = buildPathWithQueryParams(path, {
      q: search,
    });

    router.push(link);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <div className="overflow-hidden">
      <div className="relative w-full h-4 bg-gradient-to-r from-teal-400 to-blue-400 h-[50px]">
        <div className="bg-white w-[15%] h-[50px] absolute top-2 left-0 skew-x-[30deg]"></div>
        <div className="bg-white absolute top-2 left-0 w-[5%] h-[50px]"></div>
        <div className="bg-white w-[15%] h-[50px] absolute top-2 right-0 skew-x-[-30deg]"></div>
        <div className="bg-white absolute top-2 right-0 w-[5%] h-[50px]"></div>
        <div className="absolute top-0 left-[15%] right-[15%]">
          <div className="container mx-auto">
            <div className="px-10 w-full">
              <div className="flex w-full justify-between items-center h-[50px]">
                <div className="flex items-center">
                  <p className="text-white text-md font-medium">
                    Customer Service:{" "}
                    <a href="" className="font-bold">
                      021 3005 1603
                    </a>
                  </p>
                </div>
                <div className="flex">
                  {whatsapp.map((item, index) => (
                    <div className="flex items-center me-4" key={index}>
                      <Image
                        src="/assets/icons/logos_whatsapp-icon.svg"
                        width={25}
                        height={25}
                        alt="wa-logo"
                      />
                      <div className="ms-1 flex flex-col">
                        <p className="text-white text-xs">Whatsapp</p>
                        <p className="text-white text-xs font-bold">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center">
                  <div>
                    <button className="border border-1 border-white p-2 rounded-lg flex items-center me-2">
                      <p className="text-xs text-white me-1">Cara Belanja</p>
                      <Image
                        src="/assets/icons/info.svg"
                        width={15}
                        height={15}
                        alt="info"
                      />
                    </button>
                  </div>
                  <div>
                    <button className="border border-1 border-white p-2 rounded-lg flex items-center bg-[#1FAF38]">
                      <p className="text-xs text-white me-1">Login / Daftar</p>
                      <Image
                        src="/assets/icons/profile.svg"
                        width={15}
                        height={15}
                        alt="info"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-red-100 w-full">
        <div className="container mx-auto">
          <div className="mx-10 flex bg-blue-200 justify-between">
            <div>
              <Image
                src="/assets/images/logo.png"
                width={140}
                height={140}
                alt="logo"
                className="mt-[-30px]"
              />
            </div>
            <div>
              <ul className="flex items-center bg-red-300 h-full">
                {link.map((item, index) => (
                  <li key={index}>
                    <Link href={item.url} className="uppercase me-4 text-sm">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-500 flex items-center">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  placeholder="Temukan produk pilihan di sini..."
                  className="custom-input me-2 w-full rounded-full border-none bg-transparent text-sm focus:outline-none md:text-base"
                  onChange={handleSearch}
                />
              </form>
            </div>
            <div className="flex items-center">
              <div>
                <p>Cart</p>
              </div>
              <div>
                <p>Flag</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
