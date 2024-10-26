"use client";

import Link from "next/link";
import { Breadcrumbs } from "../atoms/breadcrumbs";
import Image from "next/image";
import Swal from "sweetalert2";
import { MouseEvent, useEffect, useState } from "react";
import { useUser } from "../authContext";
import { useRouter } from "next/navigation";
import { UserProps } from "@/types/users";
import { Result } from "@/types/cities";
import { ResultProvincies } from "@/types/provincies";
import { ListOrder } from "../atoms/listorder";
import Loading from "@/app/loading";
import { getDecryptedLocalStorage } from "@/lib/utils";
import { getData } from "@/app/utils/fetching";
import { IP_URL } from "@/app/utils/constans";
import ModalAddress from "../atoms/modaladdress";

type SectionUserProfile = {
  listProvincies: ResultProvincies[];
};

const Section = ({ listProvincies }: SectionUserProfile) => {
  const { value } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [notYetPaid, setnotYetPaid] = useState<any[]>([]);
  const [packed, setpacked] = useState<any[]>([]);
  const [sent, setsent] = useState<any[]>([]);
  const [finished, setfinished] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (event: MouseEvent<HTMLButtonElement>) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onLogout = () => {
    Swal.fire({
      title: "Yakin ingin keluar?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Iya",
      cancelButtonText: "Tidak",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Berhasil keluar", "", "success");
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
        window.location.href = "/";
      } else if (result.isDenied) {
        Swal.fire("Tidak jadi keluar", "", "info");
      }
    });
  };

  // Get data order
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
        })
          .then((res) => {
            setIsLoading(false);
            if (res.data) {
              const dataUser = res.data;
              getData({
                path: `orders`,
                params: {
                  populate: "users_permissions_users",
                  "filters[userId][$eq]": dataUser.id.toString() ?? "",
                },
                revalidate: 60,
              }).then((res) => {
                if (res?.data) {
                  const notYetPaid = res.data.filter(
                    (item: any) =>
                      item?.attributes.paymentStatus == "Belum Lunas" &&
                      item?.attributes.orderStatus == "Dalam Proses"
                  );
                  const packed = res.data.filter(
                    (item: any) =>
                      item?.attributes.paymentStatus == "Lunas" &&
                      item?.attributes.orderStatus == "Dalam Proses"
                  );
                  const sent = res.data.filter(
                    (item: any) =>
                      item?.attributes.paymentStatus == "Lunas" &&
                      item?.attributes.orderStatus == "Dikirim"
                  );
                  const finished = res.data.filter(
                    (item: any) =>
                      item?.attributes.paymentStatus == "Lunas" &&
                      item?.attributes.orderStatus == "Selesai"
                  );

                  setnotYetPaid(notYetPaid);
                  setpacked(packed);
                  setsent(sent);
                  setfinished(finished);
                }
              });
            } else {
              router.push("/");
            }
          })
          .catch((err) => {
            setIsLoading(false);
            router.push("/");
          });
      }
    }
  }, []);

  if (value) {
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <section className="section-categories-homepage mt-2 flex-row md:mt-16 lg:flex">
            <div className="rounded-lg border-2 border-gray-100  lg:w-4/12">
              <p className="bg-slate-100 p-4 font-medium text-gray-400">
                Dashboard
              </p>
              <ul className="p-4">
                <li className="mb-4">
                  <Link
                    href="/cart"
                    className="flex items-center text-sm font-medium hover:bg-primary-400 hover:bg-opacity-20"
                  >
                    <Image
                      unoptimized
                      src="/assets/icons/cart-cstm.svg"
                      width={25}
                      height={25}
                      alt="cart-icon"
                      className="me-2"
                    />{" "}
                    Keranjang Saya
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href={`/historytransaction?q=semua`}
                    className="flex items-center text-sm font-medium hover:bg-primary-400 hover:bg-opacity-20"
                  >
                    <Image
                      unoptimized
                      src="/assets/icons/history.svg"
                      width={25}
                      height={25}
                      alt="history-icon"
                      className="me-2"
                    />{" "}
                    Pesanan Saya
                  </Link>
                </li>
              </ul>
              <p className="bg-slate-100 p-4 font-medium text-gray-400">
                Ubah Profile
              </p>
              <ul className="bg-primary-400 p-4">
                <li>
                  <Link
                    href="/profile"
                    className="flex items-center text-sm font-medium hover:bg-primary-400 hover:bg-opacity-20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 0 448 512"
                    >
                      <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                    </svg>
                    <p className="ms-2">Ubah Profile</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-6 w-full lg:mt-0 lg:ps-10">
              <Breadcrumbs
                breadcrumbs={[
                  { label: "Beranda", href: "/" },
                  { label: "Profile" },
                ]}
              />
              <ListOrder
                notYetPaid={notYetPaid}
                packed={packed}
                sent={sent}
                finished={finished}
              />
              <Link
                href={"historytransaction?q=semua"}
                className="text-xs font-medium text-blue-400 hover:text-blue-300"
              >
                Lihat semua transaksi
              </Link>
              <div className="h-full lg:p-10">
                <div className="mt-8 lg:mt-0">
                  <Image
                    unoptimized
                    src="/assets/icons/profile-cstm.svg"
                    width={100}
                    height={100}
                    alt="profile"
                  />
                  <div className="flex flex-col">
                    <label className="mt-6">Nama Lengkap</label>
                    <input
                      className="rounded-lg lg:w-1/2"
                      type="text"
                      value={value.username}
                      disabled
                    />

                    <label className="mt-6">Email</label>
                    <input
                      className="rounded-lg lg:w-1/2"
                      type="text"
                      value={value.email || ""}
                      disabled
                    />

                    <label className="mt-6">Alamat</label>
                    <input
                      className="rounded-lg lg:w-1/2"
                      type="text"
                      value={value.address || "-"}
                      disabled
                    />

                    <div className="flex ">
                      <button
                        onClick={openModal}
                        className="mb-4 mt-6 flex cursor-pointer justify-center rounded-lg border-2 border-solid border-blue-400 bg-blue-400 p-2 font-medium text-white transition duration-200 hover:bg-blue-300 hover:text-blue-400 lg:mb-0"
                      >
                        Ubah Alamat
                      </button>
                      <button
                        onClick={() => onLogout()}
                        className="mb-4 ms-4 mt-6 flex cursor-pointer justify-center rounded-lg border-2 border-solid border-red-400 bg-red-400 p-2 font-medium text-white transition duration-200 hover:bg-red-300 hover:text-red-400 lg:mb-0"
                      >
                        Keluar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        <ModalAddress
          openModal={isModalOpen}
          setOpenModal={setIsModalOpen}
          listProvincies={listProvincies}
        />
      </>
    );
  }
};

export default Section;
