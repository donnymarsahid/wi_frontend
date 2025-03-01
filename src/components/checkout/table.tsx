"use client";

import Image from "next/image";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { QuantityInput } from "../atoms/quantityinput";
import { useRouter } from "next/navigation";
import { OrderItem } from "@/types/orders";
import {
  formatRupiah,
  getDecryptedLocalStorage,
  setEncryptedLocalStorage,
} from "@/lib/utils";
import { STRAPI_URL } from "@/app/utils/constans";
import ModalDetail from "../atoms/modaldetail";
import { CartProps } from "@/types/cart";

export const Table: React.FC<CartProps> = (dataOrder) => {
  const router = useRouter();
  const storedData = JSON.parse(
    (typeof window !== "undefined" &&
      getDecryptedLocalStorage(localStorage.getItem("dataOffering"))) ||
      "[]"
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onDelete = (indexToRemove: number) => {
    Swal.fire({
      title: "Yakin ingin menghapus?",
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
      if (typeof window !== "undefined") {
        if (result.isConfirmed) {
          Swal.fire("Berhasil dihapus", "", "success");
          const newData = [...storedData];
          newData.splice(indexToRemove, 1);

          localStorage.setItem(
            "dataOrdering",
            setEncryptedLocalStorage(JSON.stringify(newData)) ?? ""
          );
          setTimeout(() => {
            router.push("/offering/data");
          }, 1000);
        } else if (result.isDenied) {
          Swal.fire("Tidak jadi menghapus", "", "info");
        }
      }
    });
  };

  return (
    <section className="mb-6">
      <div className="flex">
        <div>
          <Image
            unoptimized
            src={
              STRAPI_URL +
              dataOrder.detail_product.data[0].attributes.images.data[0]
                .attributes.formats.small.url
            }
            width={100}
            height={50}
            alt="image"
          />
        </div>
        <div className="ms-4">
          <h1 className="font-medium capitalize">
            {dataOrder.detail_product.data[0].attributes.title}
          </h1>
          <div className="mb-2 text-xs font-medium text-primary-400">
            <div className="flex cursor-pointer" onClick={openModal}>
              <Image
                unoptimized
                src="/assets/icons/info-icon.svg"
                width={15}
                height={15}
                alt="info-icon"
                className="me-1"
              />
              Klik Detail Pesanan
            </div>
          </div>
          <div className={`mb-2 flex`}>
            <p className="me-4 text-sm font-medium text-blue-800">
              {" "}
              {formatRupiah(
                (dataOrder.original_price ?? 0) * dataOrder?.quantity
              )}
            </p>
          </div>
        </div>
      </div>
      <ModalDetail
        openModal={isModalOpen}
        setOpenModal={setIsModalOpen}
        urlImage={``}
        dataCart={dataOrder}
      />
    </section>
  );
};
