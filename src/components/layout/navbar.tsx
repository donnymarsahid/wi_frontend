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
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

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
    <>
      <div className="overflow-hidden">
        <div className="relative w-full h-4 bg-gradient-to-r from-teal-400 to-blue-400 h-[50px]">
          <div className="bg-white lg:w-[15%] 2xl:w-[20%] w-[10%] h-[50px] absolute top-2 left-0 skew-x-[30deg]"></div>
          <div className="bg-white absolute top-2 left-0 w-[5%] h-[50px]"></div>
          <div className="bg-white lg:w-[15%] 2xl:w-[20%] w-[10%] h-[50px] absolute top-2 right-0 skew-x-[-30deg]"></div>
          <div className="bg-white absolute top-2 right-0 w-[5%] h-[50px]"></div>
          <div className="absolute top-0 left-[10%] right-[10%]">
            <div className="container mx-auto">
              <div className="lg:px-[100px] 2xl:px-[250px] px-[10px] w-full">
                <div className="flex w-full md:justify-between justify-center items-center h-[50px]">
                  <div className="md:flex items-center hidden">
                    <p className="text-white font-medium lg:text-sm text-[10px]">
                      Customer Service:{" "}
                      <a href="" className="font-bold">
                        021 3005 1603
                      </a>
                    </p>
                  </div>
                  <div className="md:flex hidden">
                    {whatsapp.map((item, index) => (
                      <div className="flex items-center me-4" key={index}>
                        <Image
                          src="/assets/icons/logos_whatsapp-icon.svg"
                          width={25}
                          height={25}
                          alt="wa-logo"
                        />
                        <button className="ms-1 flex flex-col">
                          <p className="text-white lg:text-sm text-[10px]">
                            Whatsapp
                          </p>
                          <p className="text-white lg:text-sm text-[10px] font-bold">
                            {item.name}
                          </p>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <div>
                      <button className="border border-1 border-white lg:p-2 p-1 rounded-lg flex items-center me-2 hover:bg-[#76E5FF] text-white">
                        <p className="lg:text-xs text-[10px] me-1">
                          Cara Belanja
                        </p>
                        <Image
                          src="/assets/icons/info.svg"
                          width={15}
                          height={15}
                          alt="info"
                        />
                      </button>
                    </div>
                    <div>
                      <button className="border border-1 border-white lg:p-2 p-1 rounded-lg flex items-center bg-[#1FAF38] hover:bg-[#2EED4F] text-white">
                        <p className="lg:text-xs text-[10px] me-1">
                          Login / Daftar
                        </p>
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
        <div className="absolute w-full bg-white top-[47px]">
          <div className="container mx-auto">
            <div className="mx-10 flex justify-between">
              <div className="flex items-center lg:hidden">
                <button onClick={() => handleOpen()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:h-[50px] md:w-[50px] h-[35px] w-[35px] text-[#44CBEB]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex justify-center lg:justify-start lg:w-[200px] w-full">
                <Image
                  src="/assets/images/logo.png"
                  width={140}
                  height={140}
                  alt="logo"
                  className="lg:mt-[-30px] md:w-[130px] md:h-[100px] w-[90px] h-[70px]"
                />
              </div>
              <div>
                <ul className="lg:flex items-center h-full hidden">
                  {link.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.url}
                        className="uppercase me-4 hover:text-[#44CBEB]"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:flex items-center hidden">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Temukan produk pilihan di sini..."
                      className="outline-none py-2 ps-2 pe-8 rounded-md border border-2 border-[#2FCFCC] text-xs relative w-[300px]"
                      onChange={handleSearch}
                    />
                    <Image
                      src="/assets/icons/search.svg"
                      width={18}
                      height={18}
                      alt="wa-logo"
                      className="absolute top-2 right-2"
                    />
                  </div>
                </form>
              </div>
              <div className="flex items-center">
                <button className="bg-[#44CBEB] p-3 rounded-full me-2 relative hover:bg-[#76E5FF]">
                  <Image
                    src="/assets/icons/cart.svg"
                    width={18}
                    height={18}
                    alt="wa-logo"
                    className="md:w-[18px] md:h-[18px] w-[40px] h-w-[40px]"
                  />
                  <div className="bg-[#FF0000] w-[18px] h-[18px] flex items-center justify-center rounded-full absolute top-[-5px] right-0">
                    <p className="text-[11px] text-white">0</p>
                  </div>
                </button>
                <div className="md:flex items-center hidden">
                  <Image
                    src="/assets/icons/flag-idn.svg"
                    width={30}
                    height={30}
                    alt="wa-logo"
                  />
                  <p className="font-semibold">ID</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-full bg-white top-[125px] md:top-[150px] lg:hidden">
          <div className="container mx-auto">
            <div className="mx-10 flex justify-between">
              <div className="flex items-center justify-center w-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Temukan produk pilihan di sini..."
                      className="outline-none py-2 ps-2 pe-8 rounded-md border border-2 border-[#2FCFCC] text-xs relative w-[300px] md:w-[500px]"
                      onChange={handleSearch}
                    />
                    <Image
                      src="/assets/icons/search.svg"
                      width={18}
                      height={18}
                      alt="wa-logo"
                      className="absolute top-2 right-2"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 right-0 h-full bg-[#44CBEB] z-[99999] duration-300 ${
          open ? "w-[60%]" : "w-[0px]"
        }`}
      >
        <div className="bg-white flex items-center justify-center p-2">
          <Image
            src="/assets/images/head-mobile.png"
            width={110}
            height={110}
            alt="head-logo"
          />
        </div>
        <div className="mt-10">
          <div className="flex items-center px-4">
            <Image
              src="/assets/icons/flag-idn.svg"
              width={30}
              height={30}
              alt="wa-logo"
            />
            <p className="font-semibold text-white">ID</p>
          </div>
          <ul>
            {link.map((item, index) => (
              <li className="p-4 border-b-[1px] border-white-100" key={index}>
                <p className="text-white text-sm">{item.title}</p>
              </li>
            ))}
          </ul>
          <div className="p-4">
            <h1 className="text-white text-xs font-bold">Customer Service</h1>
            <a href="" className="text-xs text-white">
              021 3005 1603
            </a>
            <div className="mb-4"></div>
            {whatsapp.map((item, index) => (
              <div className="flex items-center mb-4" key={index}>
                <Image
                  src="/assets/icons/logos_whatsapp-icon.svg"
                  width={25}
                  height={25}
                  alt="wa-logo"
                />
                <button className="ms-1 flex flex-col">
                  <p className="text-white text-xs">Whatsapp</p>
                  <p className="text-white text-xs font-bold">{item.name}</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        onClick={() => handleOpen()}
        className={`fixed right-0 top-0 z-[9999] h-screen w-full border-r-2 border-gray-200 bg-black bg-opacity-50 ${
          !open && "hidden"
        } `}
      ></div>
    </>
  );
}
