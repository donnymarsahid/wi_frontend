"use client";
import React, { ChangeEvent, useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { buildPathWithQueryParams } from "@/utils/queryParams";
import { poppins } from "@/app/fonts";
import cx from "classnames";
import ModalLogin from "../atoms/modallogin";
import { getDecryptedLocalStorage } from "@/app/lib/utils";
import { getData } from "@/app/utils/fetching";
import { IP_URL } from "@/app/utils/constans";
import { useUser } from "../authContext";
import { CategoryProps } from "@/types/categories";
import { CustomerServicesProps } from "@/types/customerServices";
import { HeaderProps } from "@/types/header";
import { useOpen } from "@/app/lib/openContext";
import { CartProps } from "@/types/cart";

type SectionNavbarProps = {
  path: string;
  loginUrl?: string;
  categories: CategoryProps;
  customerServices: CustomerServicesProps;
  header: HeaderProps;
};

export default function Navbar({
  path,
  loginUrl,
  categories,
  customerServices,
  header,
}: SectionNavbarProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { open, setOpen } = useOpen();

  const { value, setUser } = useUser();
  const [isHovered, setIsHovered] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpen(!open);

  let storedImageData: CartProps[] | null = null;

  storedImageData = JSON.parse(
    (typeof window !== "undefined" &&
      getDecryptedLocalStorage(localStorage.getItem("dataCart"))) ||
      "null"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const link = [
    {
      title: "Beranda",
      url: "/",
    },
    {
      title: "Produk",
      url: "/products",
    },
    {
      title: "Berita/Inspirasi",
      url: "/news",
    },
    {
      title: "Tentang Kami",
      url: "/about",
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getDecryptedLocalStorage(
        window.localStorage.getItem("token")
      );
      if (token) {
        getData({
          path: `${IP_URL}/auth/me`,
          headers: {
            Authorization: token ?? "",
          },
          revalidate: 60,
        }).then((res) => setUser(res.data));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`overflow-hidden ${cx(poppins, poppins.className)}`}>
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
                      <Link
                        target="blank"
                        href={`tel:${header.data.attributes.office_telp.replace(
                          /\s+/g,
                          ""
                        )}`}
                        className="font-bold"
                      >
                        {header.data.attributes.office_telp}
                      </Link>
                    </p>
                  </div>
                  <div className="md:flex hidden">
                    {customerServices.data.map((item, index) => (
                      <Link
                        target="blank"
                        href={`https://api.whatsapp.com/send?phone=${item.attributes.whatsapp}&text=Halo%20Ka%20${item.attributes.name}%20Wallpaper%20Indonesia`}
                        className="flex items-center me-4"
                        key={index}
                      >
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
                            {item.attributes.name}
                          </p>
                        </button>
                      </Link>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <div>
                      <Link
                        href={"/howToShop"}
                        className="border border-1 border-white lg:p-2 p-1 rounded-lg flex items-center me-2 hover:bg-[#76E5FF] text-white transition"
                      >
                        <p className="lg:text-xs text-[10px] me-1">
                          Cara Belanja
                        </p>
                        <Image
                          src="/assets/icons/info.svg"
                          width={15}
                          height={15}
                          alt="info"
                        />
                      </Link>
                    </div>
                    <div>
                      {value ? (
                        <Link
                          href={"/profile"}
                          className="border border-1 border-white lg:p-2 p-1 rounded-lg flex items-center bg-[#0EB289] hover:bg-[#2EED4F] text-white transition"
                        >
                          <p className="lg:text-xs text-[10px] me-1">
                            Hi! {value.username}
                          </p>
                          <Image
                            src="/assets/icons/profile.svg"
                            width={15}
                            height={15}
                            alt="info"
                          />
                        </Link>
                      ) : (
                        <button
                          onClick={() => setOpenModal(!openModal)}
                          className="border border-1 border-white lg:p-2 p-1 rounded-lg flex items-center bg-[#1FAF38] hover:bg-[#2EED4F] text-white transition"
                        >
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-full bg-white top-[47px] shadow-sm">
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
              <Link
                href={"/"}
                className="flex justify-center lg:justify-start lg:w-[200px] w-full"
              >
                <Image
                  src="/assets/images/logo.png"
                  width={140}
                  height={140}
                  alt="logo"
                  className="lg:mt-[-30px] md:w-[130px] md:h-[100px] w-[90px] h-[70px]"
                />
              </Link>
              <div>
                <ul className="lg:flex items-center h-full hidden">
                  {link.map((item, index) => (
                    <li
                      key={index}
                      className="relative group font-medium" // Grup untuk mengontrol hover
                      onMouseEnter={() =>
                        item.title === "Produk" && setIsHovered(true)
                      }
                      onMouseLeave={() =>
                        item.title === "Produk" && setIsHovered(false)
                      }
                    >
                      <Link
                        href={item.url}
                        className="uppercase me-4 hover:text-[#44CBEB] transition"
                      >
                        {item.title}
                      </Link>

                      {item.title === "Produk" && (
                        <div className="absolute left-0 mt-2 w-48 z-[9999]">
                          {/* Segitiga kecil di atas dropdown */}
                          <div
                            className={`w-full absolute -top-2  ${
                              isHovered ? "block" : "hidden"
                            }`}
                          >
                            <div
                              className={`ms-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-[#44CBEB]`}
                            ></div>
                          </div>
                          <ul
                            className={`bg-[#44CBEB] text-white shadow-lg rounded-md ${
                              isHovered ? "block" : "hidden"
                            }`}
                          >
                            {categories.data.map((product, i) => (
                              <Link
                                href={`/category/${
                                  product.attributes.keyPageCondition
                                    ? `${product.attributes.keyPageCondition}--${product.attributes.slug}`
                                    : product.attributes.slug
                                }`}
                                key={i}
                                className="p-3 text-sm hover:bg-[#35B6D6] transition-colors block rounded-md"
                              >
                                {product.attributes.title}
                              </Link>
                            ))}
                          </ul>
                        </div>
                      )}
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
                    <button>
                      <Image
                        src="/assets/icons/search.svg"
                        width={18}
                        height={18}
                        alt="wa-logo"
                        className="absolute top-2 right-2"
                      />
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex items-center">
                <Link
                  href={"/cart"}
                  className="bg-[#44CBEB] p-3 rounded-full me-2 relative hover:bg-[#76E5FF] transition"
                >
                  <Image
                    src="/assets/icons/cart.svg"
                    width={18}
                    height={18}
                    alt="wa-logo"
                    className="md:w-[18px] md:h-[18px] w-[40px] h-w-[40px]"
                  />
                  <div className="bg-[#FF0000] w-[18px] h-[18px] flex items-center justify-center rounded-full absolute top-[-5px] right-0">
                    <p className="text-[11px] text-white">
                      {storedImageData?.length
                        ? storedImageData?.length.toString()
                        : "0"}
                    </p>
                  </div>
                </Link>
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
        <div className="absolute w-full bg-white top-[115px] md:top-[140px] lg:hidden shadow-sm">
          <div className="container mx-auto">
            <div className="mx-10 flex justify-between">
              <div className="flex items-center justify-center w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="p-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Temukan produk pilihan di sini..."
                      className="outline-none py-2 ps-2 pe-8 rounded-md border border-2 border-[#2FCFCC] text-xs relative w-[300px] md:w-[500px]"
                      onChange={handleSearch}
                    />
                    <button>
                      <Image
                        src="/assets/icons/search.svg"
                        width={18}
                        height={18}
                        alt="wa-logo"
                        className="absolute top-2 right-2"
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 right-0 h-full bg-[#44CBEB] z-[99999999] duration-300 ${cx(
          poppins,
          poppins.className
        )} ${open ? "w-[60%]" : "w-[0px]"}`}
      >
        <div className="bg-white flex items-center justify-center p-2">
          <Image
            src="/assets/images/logo-horizontal.png"
            width={200}
            height={200}
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
                <Link href={item.url}>
                  <p className="text-white text-sm">{item.title}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-4">
            <h1 className="text-white text-xs font-bold">Customer Service</h1>
            <Link
              target="blank"
              href={`tel:${header.data.attributes.office_telp.replace(
                /\s+/g,
                ""
              )}`}
              className="text-xs text-white"
            >
              {header.data.attributes.office_telp}
            </Link>
            <div className="mb-4"></div>
            {customerServices.data.map((item, index) => (
              <Link
                target="blank"
                href={`https://api.whatsapp.com/send?phone=${item.attributes.whatsapp}&text=Halo%20Ka%20${item.attributes.name}%20Wallpaper%20Indonesia`}
                className="flex items-center mb-4"
                key={index}
              >
                <Image
                  src="/assets/icons/logos_whatsapp-icon.svg"
                  width={25}
                  height={25}
                  alt="wa-logo"
                />
                <button className="ms-1 flex flex-col">
                  <p className="text-white text-xs">Whatsapp</p>
                  <p className="text-white text-xs font-bold">
                    {item.attributes.name}
                  </p>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div
        onClick={() => handleOpen()}
        className={`${cx(
          poppins,
          poppins.className
        )} fixed right-0 top-0 z-[9999999] h-screen w-full border-r-2 border-gray-200 bg-black bg-opacity-50 ${
          !open && "hidden"
        } `}
      ></div>
      <ModalLogin
        openModal={openModal}
        setOpenModal={setOpenModal}
        loginUrl={loginUrl as string}
      />
    </>
  );
}
