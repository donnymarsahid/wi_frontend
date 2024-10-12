"use client";

import Image from "next/image";
import React from "react";
import Swal from "sweetalert2";
import { OrdersDaum, OrdersProps } from "@/types/orders";
import { formatRupiah } from "@/lib/utils";
import { AboutProps } from "@/types/about";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { STRAPI_URL } from "@/app/utils/constans";

type SectionHistoryOrder = {
  dataHistory: OrdersDaum;
  index: number;
};

export const Table = ({ dataHistory, index }: SectionHistoryOrder) => {
  const router = useRouter();
  const redirect = (index: number) => {
    if (
      dataHistory.attributes.isPayment &&
      dataHistory.attributes.paymentStatus === "Belum Lunas"
    ) {
      router.push(`/checkout/payment/${index}`);
    } else {
      router.push(`/checkout/${index}`);
    }
  };

  return (
    <>
      {dataHistory.attributes.orderItems?.length &&
        dataHistory.attributes.orderItems.map((item, index) => (
          <div className="mb-8 flex md:mb-6" key={index}>
            <button onClick={() => redirect(dataHistory.id)}>
              <Image
                src={
                  STRAPI_URL +
                  item.detail_product.data[0].attributes.images.data[0]
                    .attributes.url
                }
                width={200}
                height={200}
                className="rounded"
                alt="image"
              />
            </button>
            <div className="flex w-full flex-col justify-between px-4 lg:px-16">
              <button
                onClick={() => redirect(dataHistory.id)}
                className="text-md text-left font-bold"
              >
                {item.detail_product.data[0].attributes.title}
              </button>
              <p className="text-xs font-medium text-primary-400 md:text-sm">
                {dataHistory.attributes.paymentStatus == "Lunas" &&
                dataHistory.attributes.paymentMethod == "Transfer Manual"
                  ? "Pembayaran Sedang Dicheck"
                  : dataHistory.attributes.paymentStatus == "Belum Lunas" &&
                    dataHistory.attributes.orderStatus == "Dalam Proses"
                  ? "Menunggu Pembayaran"
                  : dataHistory.attributes.paymentStatus == "Lunas" &&
                    dataHistory.attributes.orderStatus == "Dalam Proses"
                  ? "Sedang Dikemas"
                  : dataHistory.attributes.paymentStatus == "Lunas" &&
                    dataHistory.attributes.orderStatus == "Dikirim"
                  ? "Pesanan Sedang Dikirim"
                  : dataHistory.attributes.paymentStatus == "Lunas" &&
                    dataHistory.attributes.orderStatus == "Selesai"
                  ? "Selesai"
                  : "Paket Batal"}
              </p>
              <p className="text-xs font-medium text-gray-600 md:text-sm">
                No.Pesanan #{dataHistory.attributes.orderNumber}
              </p>
              <button
                onClick={() => redirect(dataHistory.id)}
                className="flex cursor-pointer items-center justify-between border-2 border-gray-200 px-2 text-xs font-medium text-gray-600 md:px-2 md:py-2 md:text-sm"
              >
                <p>
                  {dataHistory.attributes.paymentStatus == "Lunas" &&
                  dataHistory.attributes.paymentMethod == "Transfer Manual"
                    ? "Pesanan Telah Dibuat"
                    : dataHistory.attributes.paymentStatus == "Belum Lunas" &&
                      dataHistory.attributes.orderStatus == "Dalam Proses"
                    ? "Pesanan Telah Dibuat"
                    : dataHistory.attributes.paymentStatus == "Lunas" &&
                      dataHistory.attributes.orderStatus == "Dalam Proses"
                    ? "Pesanan Sedang Dikemas"
                    : dataHistory.attributes.paymentStatus == "Lunas" &&
                      dataHistory.attributes.orderStatus == "Dikirim"
                    ? "Pesanan Sedang Dikirim (lacak paket)"
                    : dataHistory.attributes.paymentStatus == "Lunas" &&
                      dataHistory.attributes.orderStatus == "Selesai"
                    ? "Paket Selesai Dikirim"
                    : "Paket Telah Batal"}
                </p>
                <Image
                  unoptimized
                  src="/assets/icons/arrow-right.svg"
                  width={20}
                  height={20}
                  alt="arrow-right"
                />
              </button>
              <div className="flex flex-col items-center justify-between text-xs md:flex-row md:text-sm">
                <p className="text-xs font-light font-medium text-primary-400 md:text-sm">
                  <button
                    onClick={() => redirect(dataHistory.id)}
                    className="text-blue-400"
                  >
                    Lihat Detail
                  </button>
                </p>
                <h1 className="font-medium text-gray-600">
                  Total Pesanan:{" "}
                  <span className="text-primary-400">
                    {formatRupiah(item.original_price * item.quantity)}
                  </span>
                </h1>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
