"use client";

import { Breadcrumbs } from "@/components/atoms/breadcrumbs";
import { Table } from "@/components/checkout/table";
import { OrdersProps } from "@/types/orders";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import {
  formatRupiah,
  generateWhatsAppLink,
  getDecryptedLocalStorage,
} from "@/lib/utils";
import Swal from "sweetalert2";
import Loading from "@/app/loading";
import { useUser } from "../authContext";
import Link from "next/link";
import { AboutProps } from "@/types/about";
import { patchData, postData, postDataManual } from "@/app/utils/fetching";
import { STRAPI_URL } from "@/app/utils/constans";
import { CartProps } from "@/types/cart";
import { CourierProps } from "@/types/courier";
import ModalAddress from "../atoms/modaladdress";
import { ResultProvincies } from "@/types/provincies";

type CheckoutTypeProps = {
  quoteTitle: string;
  productType: string;
  productName: string;
  quantity: number;
  size: string;
  materialName: string;
  sideFace: string;
  laminating: string;
  spotUV: string;
  description: string;
  image: string;
};

type DataOffer = {
  data: Array<CheckoutTypeProps>;
};

type SectionCheckoutDetail = {
  couriers: CourierProps;
  orderData: OrdersProps;
  flexTransactionTenMillion: boolean;
  about: AboutProps;
  listProvincies: ResultProvincies[];
};

export default function Detail({
  couriers,
  orderData,
  flexTransactionTenMillion,
  about,
  listProvincies,
}: SectionCheckoutDetail) {
  const router = useRouter();
  const { value } = useUser();
  const [freeOngkir, setFreeOngkir] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [cekDesignAvalaible, setCekDesignAvalaible] = useState<boolean>(false);
  const [trackPackage, setTrackPackage] = useState([]);
  const [loadTrackPackage, setLoadTrackPackage] = useState(true);
  const [messageTrackPackage, setMessageTrackPackage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalCstm = (event: MouseEvent<HTMLButtonElement>) => {
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  let storedImageData: CartProps[] | null = null;

  if (typeof window !== "undefined") {
    storedImageData = JSON.parse(
      getDecryptedLocalStorage(localStorage.getItem("dataCart")) || "null"
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    const messageText = `*Halo Wallpaper Indonesia, saya ${
      value?.fullname ?? ""
    } ingin pesan produk berikut*\n\n`;
    const encodedMessage = encodeURIComponent(messageText);
    let result = `https://api.whatsapp.com/send?phone=${about.data.attributes.no_telp_admin_order}&text=${encodedMessage}`;

    if (
      orderData?.data[0].attributes.orderItems &&
      orderData?.data[0].attributes.orderItems.length
    ) {
      for (
        let i = 0;
        i < orderData?.data[0].attributes.orderItems.length;
        i++
      ) {
        result += generateWhatsAppLink(
          orderData?.data[0].attributes.orderItems[i],
          i,
          orderData?.data[0].attributes.orderItems.length - 1,
          orderData?.data[0].attributes.grandTotal || "0",
          orderData.data[0].attributes.orderNumber,
          {
            courier: `${courier ? courier.toUpperCase() : "-"} | ${
              serviceCourier?.service
                ? serviceCourier?.service?.toString()
                : "-"
            }`,
            nominalOngkir: nominalOngkir ? nominalOngkir : 0,
          }
        );
      }
    }

    window.open(result, "_blank");
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loadSender, setLoadSender] = useState(false);
  const [loadSenderDone, setLoadSenderDone] = useState(false);

  const [courier, setCourier] = useState<string>();
  const [mtdPayment, setMtdPayment] = useState<string>();

  const [serviceCourier, setServiceCourier] = useState<any>();
  const [nominalOngkir, setNominalOngkir] = useState<number>(0);
  const [estimasiOngkir, setEstimasiOngkir] = useState<string>("-");

  const [serviceTypeCourer, setServiceTypeCourer] = useState([]);

  const chooseCourier = (event: ChangeEvent<HTMLSelectElement>): void => {
    setCourier(event.target.value);
    setMtdPayment("");
  };

  useEffect(() => {
    if (mtdPayment == "others") onSubmit();
  }, [mtdPayment]);

  useEffect(() => {
    if (orderData.data[0]?.attributes.ongkir?.noresi) {
      const headers = {
        "Content-Type": "application/json",
      };
      postData({
        path: `rajaongkir/cekresi`,
        body: {
          noresi: orderData?.data[0]?.attributes.ongkir?.noresi,
          courier: orderData?.data[0]?.attributes.ongkir?.courier,
        },
        headers,
      }).then((res) => {
        if (res?.rajaongkir) {
          if (res.rajaongkir?.status?.code == 200) {
            setTrackPackage(res.rajaongkir.result.manifest);
            setLoadTrackPackage(false);
          } else {
            setMessageTrackPackage(
              "Lacak paket tidak tersedia hubungi admin kami"
            );
            setLoadTrackPackage(false);
          }
        } else {
          setMessageTrackPackage(
            "Lacak paket tidak tersedia hubungi admin kami"
          );
          setLoadTrackPackage(false);
        }
      });
    }
  }, []);

  const chooseServiceCourier = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const eventvalue: any = JSON.parse(event.target.value);

    setNominalOngkir(parseInt(eventvalue?.cost[0]?.value));

    setServiceCourier(eventvalue);
    setEstimasiOngkir(eventvalue?.cost[0]?.etd);
  };

  const submitOrderDone = async () => {
    // Process update order start
    const tokenData = getDecryptedLocalStorage(
      window.localStorage.getItem("token")
    );

    patchData({
      path: `orders/${orderData?.data[0]?.id}`,
      headers: {
        Authorization: `Bearer ${tokenData}`,
        "Content-Type": "application/json",
      },
      body: {
        data: { orderStatus: "Selesai" },
      },
    })
      .then((res) => {
        if (res) {
          Swal.fire("Pesanan anda berhasil diterima!", "", "success");

          setTimeout(() => {
            window.location.href = "/profile";
          }, 1500);
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Ada kesalahan!", "", "info");
      });
    // Process update order end
  };

  useEffect(() => {
    if (courier) {
      let result = 0;
      for (const iterator of orderData.data[0].attributes.orderItems) {
        result += iterator?.detail_product?.attributes?.brands?.data[0]
          ?.attributes?.product_weight
          ? iterator?.detail_product?.attributes?.brands?.data[0]?.attributes
              ?.product_weight
          : 0;
      }

      setNominalOngkir(0);
      setLoadSender(true);
      setLoadSenderDone(false);
      const dataService = {
        origin: (value?.city?.city_id).toString(),
        originType: "city",
        destination: value?.subdistrict?.subdistrict_id,
        destinationType: "subdistrict",
        weight: result.toString(),
        courier: courier,
      };

      postDataManual({
        path: `rajaongkir/cost`,
        headers: {
          "Content-Type": "application/json",
        },
        body: dataService,
      })
        .then((res) => {
          if (res?.rajaongkir?.results[0]?.costs?.length) {
            setServiceTypeCourer(res.rajaongkir.results[0]?.costs);
            setLoadSenderDone(true);
          } else {
            setLoadSenderDone(true);
            alert("kurir tidak tersedia");
            setServiceTypeCourer([]);
          }
        })
        .catch((err) => {
          console.log(err, "err raja ongkir");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courier]);

  return (
    <>
      {isLoading ? (
        <div className="container mx-auto flex h-screen items-center justify-center p-4 md:px-28">
          <Loading />
        </div>
      ) : (
        <main className="container mx-auto mt-6 p-4 md:mt-16 md:px-28">
          <div className="border-2 border-blue-300 bg-blue-300 p-4 lg:flex lg:items-center lg:justify-between">
            <h3 className="text-2xl text-white">Checkout</h3>
            <Breadcrumbs
              breadcrumbs={[
                { label: "Beranda", href: "/" },
                { label: "Checkout" },
              ]}
              colorCustom={true}
            />
          </div>
          <section className="w-full justify-between border-2 border-gray-200 p-2 lg:flex lg:p-6">
            <div className="lg:w-3/5">
              <div>
                <h3 className="mt-4 font-bold">Barang yang dibeli</h3>
                <div className="mt-4"></div>
                {orderData?.data[0]?.attributes.orderItems?.map(
                  (item, index) => (
                    <Table {...item} key={index} />
                  )
                )}
              </div>
              <hr />
              <div>
                {/* <h3 className="mt-4 font-bold">Pengiriman dan Pembayaran</h3> */}
                <h3 className="mt-4 font-bold">Pengiriman</h3>
                <div className="mt-4"></div>
                <button
                  onClick={openModalCstm}
                  className="mb-4 flex w-full cursor-pointer items-center justify-between rounded-lg bg-gray-200 bg-opacity-20 p-2 text-sm"
                >
                  <div className="text-start">
                    <p className="font-medium">
                      {!value?.address
                        ? "Klik Disini Untuk Masukkan Alamat"
                        : "Alamat"}
                    </p>
                    <div className="md:text-md text-xs text-gray-500">
                      {value?.address && (
                        <div>
                          <p>{value?.province?.province}</p>
                          <p>
                            {value?.city?.city_name} - ({value?.city?.type})
                          </p>
                          <p>{value?.subdistrict?.subdistrict_name}</p>
                          <p>{value?.address}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    {!orderData.data[0].attributes.isPayment && (
                      <Image
                        unoptimized
                        src="/assets/icons/arrow-right.svg"
                        width={25}
                        height={25}
                        alt="arrow-right"
                      />
                    )}
                  </div>
                </button>
                {!orderData.data[0].attributes.isPayment && (
                  <>
                    {value?.address &&
                      value?.city &&
                      value?.subdistrict &&
                      value?.province && (
                        <div className="mb-4 text-sm">
                          <p className="font-medium">Pengiriman</p>

                          <div className="flex justify-between">
                            <div className="flex w-1/2 flex-col">
                              <label>Pilih Kurir</label>
                              <select
                                {...register("courier", { required: true })}
                                className="rounded-lg border border-1 outline-none"
                                onChange={(e) => chooseCourier(e)}
                                defaultValue={"no-option"}
                              >
                                <option value="no-option" disabled>
                                  -- Pilih --
                                </option>
                                {/* {flexTransactionTenMillion && (
                                  <option value="courier-pusat-cetak-indonesia">
                                    Wallpaper Indonesia
                                  </option>
                                )} */}
                                {couriers.data.map((item, index) => (
                                  <option value={item} key={index}>
                                    {item.toUpperCase()}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mx-4"></div>
                            {loadSender &&
                              (loadSenderDone ? (
                                <div className="flex w-1/2 flex-col">
                                  <label>Pilih Pengiriman</label>
                                  <select
                                    {...register("serviceCourierForm", {
                                      required: true,
                                    })}
                                    onChange={(e) => chooseServiceCourier(e)}
                                    className="rounded-lg border border-1 outline-none"
                                    defaultValue={"no-option"}
                                  >
                                    <option value="no-option" disabled>
                                      -- Pilih --
                                    </option>
                                    {serviceTypeCourer?.length &&
                                      serviceTypeCourer.map(
                                        (item: any, index: any) => (
                                          <option
                                            value={JSON.stringify(item)}
                                            key={index}
                                          >
                                            {item.service.toUpperCase()}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                              ) : (
                                <div className="flex w-[200px] items-center justify-center">
                                  <div>
                                    <Image
                                      unoptimized
                                      src="/assets/icons/loader.gif"
                                      width={50}
                                      height={30}
                                      alt="loading..."
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                  </>
                )}
              </div>
              {orderData.data[0]?.attributes.ongkir?.noresi && (
                <>
                  {/* Lacak Paket Start */}
                  <div>
                    <h3 className="mt-4 font-bold">Lacak Paket</h3>
                    {loadTrackPackage && (
                      <>
                        <p>Sedang Memuat lacak paket...</p>
                      </>
                    )}
                    {messageTrackPackage}
                    <div className="mt-6 border-l-2 border-gray-600 text-sm font-medium text-gray-600">
                      {trackPackage.map((item: any, index) => (
                        <div key={index} className="mb-4 flex ps-2">
                          <Image
                            src={
                              index === 0
                                ? "/assets/icons/checklist-record.svg"
                                : "/assets/icons/cargo-truck.svg"
                            }
                            width={20}
                            height={20}
                            alt="icon"
                          />
                          <div className="ps-2">
                            <p>{item.manifest_description}</p>
                            <p>
                              {item.manifest_date} {item.manifest_time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Lacak Paket End */}
                </>
              )}
            </div>
            <div className="mx-4"></div>
            <div className="lg:w-2/5">
              <div className="rounded-lg border-2 border-gray-200 bg-slate-500 bg-white">
                {!orderData.data[0].attributes.isPayment ? (
                  <div className="px-8 py-4">
                    {/* Detail Pesanan Belum Ada Aksi Pembayaran Start */}
                    <h1 className="text-md font-bold">Ringkasan Belanja</h1>
                    <div className="mb-2 flex justify-between">
                      <p className="text-sm text-gray-400">Kode Transaksi</p>
                      <p className="text-sm text-gray-400">
                        {orderData.data[0]?.attributes.orderNumber}
                      </p>
                    </div>
                    <p className="mt-2 font-medium">Total Belanja</p>
                    <div className="mt-2">
                      <div className="mb-2 flex justify-between">
                        <p className="text-sm text-gray-400">
                          Total Harga (
                          {orderData.data[0]?.attributes.orderItems?.length
                            ? orderData.data[0]?.attributes.orderItems?.length
                            : 0}{" "}
                          Produk)
                        </p>
                        <p className="text-sm text-gray-400">
                          {formatRupiah(
                            parseFloat(
                              orderData.data[0]?.attributes?.grandTotal || "0"
                            )
                          )}
                        </p>
                      </div>
                      <div className="mb-2 flex justify-between">
                        <p className="text-sm text-gray-400">
                          Total Ongkos Kirim
                        </p>
                        <p className="text-sm text-gray-400">
                          {nominalOngkir ? formatRupiah(nominalOngkir) : "-"}
                        </p>
                      </div>
                    </div>
                    {/* Detail Pesanan Belum Ada Aksi Pembayaran End */}
                  </div>
                ) : (
                  <div className="px-8 py-4">
                    <h1 className="text-md font-bold">Status</h1>
                    <div className="mb-2 flex justify-between">
                      <p className="text-md text-md md:text-md  text-sm">
                        Status Transaksi
                      </p>
                      <p className="md:text-md  text-sm">
                        {orderData?.data[0]?.attributes.orderStatus}
                      </p>
                    </div>
                    <div className="mb-2 flex justify-between">
                      <p className="text-md text-md md:text-md  text-sm">
                        Pembayaran
                      </p>
                      <p className="md:text-md  text-sm">
                        {
                          orderData?.data[0]?.attributes.paymentMethodJSON
                            ?.title
                        }
                      </p>
                    </div>
                    <div className="mb-2 flex justify-between">
                      <p className="text-md text-md md:text-md  text-sm">
                        Status Pembayaran
                      </p>
                      <p className="md:text-md  text-sm">
                        {orderData?.data[0]?.attributes.paymentStatus}
                      </p>
                    </div>

                    <div className="mb-2 flex justify-between">
                      <p className="text-md text-md md:text-md  text-sm">
                        No. Resi{" "}
                        {/* <button className="md:text-md text-xs text-red-400  ">
                (lacak paket)
              </button> */}
                      </p>
                      <p className="md:text-md  text-sm"></p>
                    </div>
                    <h1 className="text-md font-bold">Ringkasan Belanja</h1>
                    <div className="mb-2 flex justify-between">
                      <p className="text-sm text-gray-400">Kode Transaksi</p>
                      <p className="text-sm text-gray-400">
                        {orderData.data[0]?.attributes.orderNumber}
                      </p>
                    </div>
                    <p className="mt-2 font-medium">Total Belanja</p>
                    <div className="mt-2">
                      <div className="mb-2 flex justify-between">
                        <p className="text-sm text-gray-400">
                          Total Harga (
                          {orderData?.data[0]?.attributes.orderItems?.length
                            ? orderData?.data[0]?.attributes.orderItems?.length
                            : 0}{" "}
                          Produk)
                        </p>
                        <p className="text-sm text-gray-400">
                          {formatRupiah(
                            parseFloat(
                              orderData.data[0]?.attributes?.grandTotal || "0"
                            )
                          )}
                        </p>
                      </div>
                      <div className="mb-2 flex justify-between">
                        <p className="text-sm text-gray-400">Kurir</p>
                        <p className="text-sm text-gray-400"></p>
                      </div>
                      <div className="mb-2 flex justify-between">
                        <p className="text-sm text-gray-400">
                          Total Ongkos Kirim
                        </p>
                        {orderData.data[0]?.attributes.ongkir?.cost ? (
                          <p className="text-sm text-gray-400">
                            {formatRupiah(
                              parseFloat(
                                orderData.data[0]?.attributes.ongkir?.cost
                              )
                            )}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-400">
                            {/* {freeOngkir === true
                            ? "Gratis Ongkir"
                            : loadSender && loadSenderDone && nominalOngkir
                            ? formatRupiah(nominalOngkir)
                            : 0} */}
                            {nominalOngkir ? formatRupiah(nominalOngkir) : "-"}
                          </p>
                        )}
                      </div>
                      <div className="mb-2 flex justify-between">
                        <p className="text-sm text-gray-400">
                          Estimasi Pengiriman
                        </p>
                      </div>
                      {/* <div className="mb-2 flex justify-between">
              <p className="text-sm text-gray-400">Total Diskon</p>
              <p className="text-sm text-gray-400">Rp 100.000</p>
            </div> */}
                    </div>
                  </div>
                )}
                <hr />
                <div className="px-8 py-4">
                  <div className="mt-2">
                    <div className="mb-2 flex justify-between">
                      <h1 className="text-md font-bold">Total Tagihan</h1>
                      <p className="text-md font-bold">
                        {orderData?.data[0]?.attributes.grandTotal
                          ? formatRupiah(
                              parseInt(
                                orderData?.data[0]?.attributes.grandTotal +
                                  (nominalOngkir ? nominalOngkir : 0)
                              )
                            )
                          : 0}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-8 py-4">
                  {orderData.data[0].attributes.paymentStatus !== "Lunas" && (
                    <button
                      onClick={onSubmit}
                      className={`bg-blue-400 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition`}
                    >
                      <svg
                        className="unf-icon"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="#FFFFFF"
                        style={{
                          display: "inline-block",
                          marginRight: "4px",
                          verticalAlign: "middle",
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.641 5.18a3.46 3.46 0 001.439.37 1.68 1.68 0 011.61 1.84v3.5c0 5.42-3.37 8.21-6.69 10.21a3 3 0 01-2.01.64 3.7 3.7 0 01-2-.6c-4.05-2.33-6.76-4.97-6.76-10.25v-3.5a1.75 1.75 0 011.65-1.84 3.57 3.57 0 002.41-1.26 6.46 6.46 0 014.69-2.05 5.9 5.9 0 014.51 2 3.46 3.46 0 001.151.94zM13.23 19.89c4.25-2.61 6-5.21 6-9l.02-3.5c0-.08-.01-.34-.15-.34a4.89 4.89 0 01-3.62-1.72A4.42 4.42 0 0012 3.74a5 5 0 00-3.71 1.67 4.92 4.92 0 01-3.35 1.64c-.07 0-.15.18-.15.34v3.54c0 4.57 2.28 6.82 6 8.95.362.25.79.39 1.23.4a1.51 1.51 0 001.07-.28l.14-.11zM11 13l3-3a.75.75 0 011 1l-3.46 3.53a.74.74 0 01-.53.22.78.78 0 01-.51-.2l-2.08-1.91a.75.75 0 011-1.11L11 13z"
                        ></path>
                      </svg>
                      {orderData.data[0].attributes.isPayment &&
                      orderData.data[0].attributes.paymentStatus ===
                        "Belum Lunas"
                        ? "Pesan Sekarang"
                        : "Pesan Sekarang"}
                    </button>
                  )}
                  {orderData.data[0]?.attributes.paymentStatus === "Lunas" &&
                    orderData.data[0]?.attributes.orderStatus === "Dikirim" && (
                      <button
                        onClick={submitOrderDone}
                        className={`bg-blue-400 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition`}
                      >
                        Pesanan Diterima
                      </button>
                    )}
                </div>
              </div>
            </div>
          </section>
          <ModalAddress
            openModal={isModalOpen}
            setOpenModal={setIsModalOpen}
            listProvincies={listProvincies}
          />
        </main>
      )}
    </>
  );
}
