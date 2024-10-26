"use client";

import { OrdersProps } from "@/types/orders";
import { Table } from "@/components/historytransaction/table";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ButtonPrimary } from "../atoms/button";
import { useUser } from "../authContext";
import Loading from "@/app/loading";
import { UserProps } from "@/types/users";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDecryptedLocalStorage } from "@/lib/utils";
import { getData } from "@/app/utils/fetching";
import { IP_URL } from "@/app/utils/constans";

type SectionHistoryOrder = {
  dataPaymentStatus: string;
  dataOrderStatus: string;
  isAll: boolean;
};

const Section = ({
  dataPaymentStatus,
  dataOrderStatus,
  isAll = false,
}: SectionHistoryOrder) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<OrdersProps>();
  const [type, setType] = useState<string>("");
  const router = useRouter();

  const class_1 =
    "mr-6 mt-2 rounded-full border-2 border-blue-400 bg-blue-400 md:px-4 px-2 py-2 md:text-sm text-xs font-medium text-white hover:bg-blue-300";
  const class_2 =
    "mr-6 mt-2 rounded-full border-2 border-blue-400 md:px-4 px-2 py-2 md:text-sm text-xs font-medium text-blue-400 hover:bg-blue-300";
  const class_1_1 =
    "mr-6 mt-2 rounded-full border-2 border-red-400 bg-red-400 md:px-4 px-2 py-2 md:text-sm text-xs font-medium text-white hover:bg-red-300";
  const class_2_2 =
    "mr-6 mt-2 rounded-full border-2 border-red-400 md:px-4 px-2 py-2 md:text-sm text-xs font-medium text-red-400 hover:bg-red-300";

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
        })
          .then((res) => {
            setIsLoading(false);
            if (res.data) {
              const dataUser = res.data;
              const params: any =
                isAll === true
                  ? {
                      populate:
                        "bukti_transfer,ongkir,shippingAddress,orderItems,orderItems.products,users_permissions_users",
                      "filters[userId][$eq]": dataUser?.id.toString() ?? "",
                      "sort[0]": "createdAt:desc",
                    }
                  : {
                      populate:
                        "bukti_transfer,ongkir,shippingAddress,orderItems,orderItems.products,users_permissions_users",
                      "filters[paymentStatus][$eq]": dataPaymentStatus,
                      "filters[orderStatus][$eq]": dataOrderStatus,
                      "filters[userId][$eq]": dataUser?.id.toString() ?? "",
                      "sort[0]": "createdAt:desc",
                    };

              getData({
                path: `orders`,
                params,
              }).then((res) => {
                if (res?.data) {
                  setType(getResult());
                  setOrders(res);
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

  const getResult = () => {
    if (
      dataPaymentStatus === "Belum Lunas" &&
      dataOrderStatus === "Dalam Proses"
    ) {
      return "belum-bayar";
    } else if (
      dataPaymentStatus === "Lunas" &&
      dataOrderStatus === "Dalam Proses"
    ) {
      return "dikemas";
    } else if (dataPaymentStatus === "Lunas" && dataOrderStatus === "Dikirim") {
      return "dikirim";
    } else if (dataPaymentStatus === "Lunas" && dataOrderStatus === "Selesai") {
      return "selesai";
    } else if (
      dataPaymentStatus === "Ditolak" &&
      dataOrderStatus === "Selesai"
    ) {
      return "gagal";
    } else {
      return "semua";
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : orders && orders?.data?.length ? (
        <section className="flex w-full justify-center border-2 border-gray-200 px-4 py-2 lg:px-6 lg:py-2">
          <div className="container mt-10 lg:mx-16">
            <div className="mb-8 flex w-full flex-wrap justify-center">
              <button
                onClick={() =>
                  (window.location.href = "historytransaction?q=semua")
                }
                className={type == "semua" ? class_1 : class_2}
              >
                Semua
              </button>
              <button
                onClick={() =>
                  (window.location.href = "historytransaction?q=belum-bayar")
                }
                className={type == "belum-bayar" ? class_1 : class_2}
              >
                Belum Bayar
              </button>
              <button
                onClick={() =>
                  (window.location.href = "historytransaction?q=dikemas")
                }
                className={type == "dikemas" ? class_1 : class_2}
              >
                Dikemas
              </button>
              <button
                onClick={() =>
                  (window.location.href = "historytransaction?q=dikirim")
                }
                className={type == "dikirim" ? class_1 : class_2}
              >
                Dikirim
              </button>
              <button
                onClick={() =>
                  (window.location.href = "historytransaction?q=selesai")
                }
                className={type == "selesai" ? class_1 : class_2}
              >
                Selesai
              </button>
              <button
                onClick={() =>
                  (window.location.href = "historytransaction?q=gagal")
                }
                className={type == "gagal" ? class_1_1 : class_2_2}
              >
                Gagal
              </button>
            </div>
            {orders?.data?.map((item, index) => (
              <Table index={index} dataHistory={item} key={index} />
            ))}
          </div>
        </section>
      ) : (
        <div className="h-screen border-2 border-gray-200 ">
          <div className="container mt-10">
            <div className="mb-8 flex w-full flex-wrap justify-center">
              <button
                onClick={() =>
                  (window.location.href = "historytransaction?q=semua")
                }
                className={type == "semua" ? class_1 : class_2}
              >
                Semua
              </button>
              <button
                onClick={() =>
                  (window.location.href = "historytransaction?q=belum-bayar")
                }
                className={type == "belum-bayar" ? class_1 : class_2}
              >
                Belum Bayar
              </button>
              <button
                onClick={() =>
                  (window.location.href = "historytransaction?q=dikemas")
                }
                className={type == "dikemas" ? class_1 : class_2}
              >
                Dikemas
              </button>
              <button
                onClick={() =>
                  (window.location.href = "historytransaction?q=dikirim")
                }
                className={type == "dikirim" ? class_1 : class_2}
              >
                Dikirim
              </button>
              <button
                onClick={() =>
                  (window.location.href = "historytransaction?q=selesai")
                }
                className={type == "selesai" ? class_1 : class_2}
              >
                Selesai
              </button>
              <button
                onClick={() =>
                  (window.location.href = "historytransaction?q=gagal")
                }
                className={type == "gagal" ? class_1_1 : class_2_2}
              >
                Gagal
              </button>
            </div>
          </div>
          <div className="flex h-full flex-col items-center justify-center">
            <Image
              loading="lazy"
              unoptimized
              src="/assets/icons/empty.jpg"
              width={150}
              height={150}
              alt="nodata"
            />
            <h1 className="my-4">Transaksi masih kosong...</h1>
            <ButtonPrimary text="Belanja Sekarang" onClick="/products" />
          </div>
        </div>
      )}
    </>
  );
};

export default Section;
