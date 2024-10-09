"use client";

import { Breadcrumbs } from "@/components/atoms/breadcrumbs";
import { ButtonPrimary, ButtonSecondary } from "@/components/atoms/button";
import { Table } from "@/components/cart/table";
import {
  calculateDiscountNumber,
  formatRupiah,
  generateNumber,
  getDecryptedLocalStorage,
} from "@/lib/utils";
import { CartProps } from "@/types/cart";
import { UserProps } from "@/types/users";
import { useCartProvider } from "@/utils/cartProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useUser } from "../authContext";
import { getData } from "@/app/utils/fetching";
import { IP_URL } from "@/app/utils/constans";

type DataCart = {
  data: Array<CartProps>;
};

type FormDataCart = {
  orderNumber: string;
  customerName: string;
  orderDate: Date;
  orderStatus: string;
  paymentStatus: string;
  totalAmount: string;
  grandTotal: string;
  orderItems: Array<any>;
  userId: number;
  users_permissions_users: number;
};

type SectionCartProps = {
  loginUrl?: string;
};

export default function Detail({ loginUrl }: SectionCartProps) {
  const router = useRouter();
  let storedImageData: CartProps[] | null = null;

  const { totalCart, setTotalCart } = useCartProvider();
  const { totalProductCart, setTotalProductCart } = useCartProvider();
  const [value, setUser] = useState<any>();

  if (typeof window !== "undefined") {
    storedImageData = JSON.parse(
      getDecryptedLocalStorage(localStorage.getItem("dataCart")) || "null"
    );
  }

  const cartDatas: DataCart = {
    data: storedImageData || [],
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  // Start
  useEffect(() => {
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
          if (res.data) {
            const dataUser = res.data;
            setUser(dataUser);
          }
        })
        .catch((err) => {
          router.push("/");
        });
    }
  }, []);
  // End

  useEffect(() => {
    if (storedImageData && storedImageData?.length > 0) {
      let total: number = 0;

      for (const item of storedImageData) {
        let num: number = (item.original_price ?? 0) * item.quantity;

        total += num;
      }

      setTotalCart(totalCart ? totalCart : total);
      setTotalProductCart(
        totalProductCart ? totalProductCart : storedImageData.length || 0
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedImageData, totalCart]);

  const onPayment = async () => {
    if (typeof window !== "undefined") {
      if (value) {
        Swal.fire({
          title: "Lanjut pembayaran?",
          html: "Jika Anda lanjut pembayaran, keranjang akan dihapus semua. periksa kembali keranjang anda!",
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
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              Swal.fire("Berhasil membuatkan orderan", "", "success");
              const resultOrderItems = [];
              const dataGetCart = JSON.parse(
                getDecryptedLocalStorage(localStorage.getItem("dataCart")) ||
                  "null"
              );
              for (const iterator of dataGetCart) {
                resultOrderItems.push(
                  JSON.stringify({
                    product: iterator.id_product,
                    qty: iterator.quantity,
                    amount: iterator.quantity * iterator.originalPrice,
                    detailsItems: iterator,
                  })
                );
              }

              const formData: FormDataCart = {
                orderNumber: generateNumber(),
                customerName: value.username,
                orderDate: new Date(),
                orderStatus: "Dalam Proses",
                paymentStatus: "Belum Lunas",
                totalAmount: totalCart.toString(),
                grandTotal: totalCart.toString(),
                orderItems: resultOrderItems,
                userId: value.id,
                users_permissions_users: value.id,
              };

              const getToken = getDecryptedLocalStorage(
                localStorage.getItem("token")
              );
              const headers = {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getToken,
              };

              // const res = await postData({
              //   path: "orders",
              //   params: {
              //     populate: "*",
              //   },
              //   body: formData,
              //   headers: headers,
              //   method: "POST",
              // });
              // if (res?.data !== null) {
              //   localStorage.removeItem("dataCart");
              //   router.push(`/checkout/${res?.data.id}`);
              // } else Swal.fire("Internal server error!");
            } catch (error) {
              console.error(error);
              Swal.fire("Internal server error!");
            }
          } else if (result.isDenied) {
            Swal.fire("Tetap dihalaman keranjang", "", "info");
          }
        });
      } else {
        setIsModalOpen(true);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <main>
      <>
        <div className="mt-6 border-2 border-blue-300 bg-blue-300 p-4 md:mt-12 lg:flex lg:items-center lg:justify-between">
          <h3 className="text-2xl text-white">Keranjang</h3>
          <Breadcrumbs
            breadcrumbs={[
              { label: "Beranda", href: "/" },
              { label: "Keranjang" },
            ]}
            colorCustom={true}
          />
        </div>
        {storedImageData && storedImageData?.length > 0 ? (
          <section className="w-full justify-between border-2 border-gray-200 p-2 lg:flex lg:p-6">
            <div className="lg:w-3/5">
              <div>
                <h3 className="mt-4 font-bold">Barang yang dibeli</h3>
                <div className="mt-4"></div>
                {cartDatas?.data?.map((item, index) => (
                  <Table dataCart={item} index={index} key={index} />
                ))}
              </div>
            </div>
            <div className="mx-4"></div>
            <div className="lg:w-2/5">
              {/* NOTE DONY - Duplicate classname */}
              {/* bg-slate-500 bg-white*/}
              <div className="rounded-lg border-2 border-gray-200 bg-white">
                <div className="px-8 py-4">
                  <h1 className="text-lg font-bold">Keranjang Belanja</h1>
                  <p className="mt-2 font-medium">Total Belanja</p>
                  <div className="mt-2">
                    <div className="mb-2 flex justify-between">
                      <p className="text-sm text-gray-400">Total Harga</p>
                      <p className="text-sm text-gray-400">
                        {formatRupiah(totalCart)}
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="px-8 py-4">
                  <div className="mt-2">
                    <div className="mb-2 flex justify-between">
                      <h1 className="text-lg font-bold">Total Tagihan</h1>
                      <p className="text-lg font-bold">
                        {formatRupiah(totalCart)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-8 py-4">
                  <button
                    onClick={() => onPayment()}
                    className={`bg-blue-400 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition`}
                  >
                    Checkout Sekarang
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="h-screen border-2 border-gray-200 ">
            <div className="flex h-full flex-col items-center justify-center">
              <Image
                unoptimized
                src="/assets/icons/empty.jpg"
                width={150}
                height={150}
                alt="nodata"
              />
              <h1 className="my-4">Keranjang masih kosong...</h1>
              <ButtonPrimary text="Belanja Sekarang" onClick="/products" />
            </div>
          </div>
        )}
      </>
    </main>
  );
}
