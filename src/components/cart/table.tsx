"use client";

import Image from "next/image";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { QuantityInput } from "../atoms/quantityinput";
import { CartProps } from "@/types/cart";
import {
  calculateDiscount,
  formatRupiah,
  getDecryptedLocalStorage,
  setEncryptedLocalStorage,
} from "@/lib/utils";
import { useRouter } from "next/navigation";
import { STRAPI_URL } from "@/app/utils/constans";
import ModalDetail from "../atoms/modaldetail";

type SectionCartPage = {
  dataCart: any;
  index: number;
};

export const Table = ({ dataCart, index }: SectionCartPage) => {
  const router = useRouter();
  const storedData = JSON.parse(
    (typeof window !== "undefined" &&
      getDecryptedLocalStorage(localStorage.getItem("dataCart"))) ||
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
          const resultDataReverse = storedData;
          const newData = [...resultDataReverse];
          newData.splice(indexToRemove, 1);

          localStorage.setItem(
            "dataCart",
            setEncryptedLocalStorage(JSON.stringify(newData)) ?? ""
          );
          setTimeout(() => {
            window.location.reload();
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
          {dataCart?.detail_product?.attributes?.images &&
            dataCart?.detail_product?.attributes?.images?.data?.length && (
              <Image
                unoptimized
                src={
                  STRAPI_URL +
                  dataCart.detail_product.attributes.images.data[0].attributes
                    .url
                }
                width={100}
                height={50}
                alt="image"
              />
            )}
        </div>
        <div className="ms-4">
          <h1 className="font-medium capitalize">
            {dataCart.detail_product.attributes.title}
          </h1>
          <div className="mb-2 text-xs font-medium text-primary-400">
            <button className="flex cursor-pointer" onClick={openModal}>
              <Image
                unoptimized
                src="/assets/icons/info-icon.svg"
                width={15}
                height={15}
                alt="info-icon"
                className="me-1"
              />
              Klik Detail Pesanan
            </button>
          </div>

          <div className={`mb-2 flex`}>
            <p className="me-4 text-sm font-medium text-blue-800">
              {formatRupiah(
                (dataCart?.original_price ?? 0) * dataCart?.quantity
              )}
            </p>
          </div>

          <div>
            <QuantityInput
              price={dataCart.original_price ?? 0}
              index={index}
              quantityData={dataCart?.quantity}
              minimumQuantity={1}
            />
          </div>
          <div className="mt-2">
            <button onClick={() => onDelete(index)}>
              <Image
                unoptimized
                src="/assets/icons/red-trash.svg"
                width={20}
                height={20}
                alt="red-trash"
              />
            </button>
          </div>
        </div>
      </div>
      <ModalDetail
        openModal={isModalOpen}
        setOpenModal={setIsModalOpen}
        urlImage={``}
        dataCart={dataCart}
      />
    </section>
  );
};
