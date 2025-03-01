import { Breadcrumbs } from "@/components/atoms/breadcrumbs";
import dynamic from "next/dynamic";
import cx from "classnames";
import { poppins } from "../fonts";
import Section from "@/components/historytransaction/section";

type tParams = Promise<{ q: string }>;

export default async function Page(props: { searchParams: tParams }) {
  const dataPaymentStatus =
    (await props.searchParams).q == "belum-bayar"
      ? "Belum Lunas"
      : (await props.searchParams).q == "gagal"
      ? "Ditolak"
      : "Lunas";

  const dataOrderStatus =
    (await props.searchParams).q == "belum-bayar" ||
    (await props.searchParams).q == "dikemas"
      ? "Dalam Proses"
      : (await props.searchParams).q == "dikirim"
      ? "Dikirim"
      : (await props.searchParams).q == "selesai"
      ? "Selesai"
      : (await props.searchParams).q == "gagal"
      ? "Selesai"
      : "Semua";

  const isAll = (await props.searchParams).q == "semua";

  return (
    <main
      className={`container mx-auto mt-6 p-4 md:mt-16 md:px-28 ${cx(
        poppins,
        poppins.className
      )}`}
    >
      <>
        <div className="border-2 border-blue-300 bg-blue-300 p-4 lg:flex lg:items-center lg:justify-between">
          <h3 className="text-2xl text-white">Pesanan Saya</h3>
          <Breadcrumbs
            breadcrumbs={[
              { label: "Beranda", href: "/" },
              { label: "Pesanan Saya" },
            ]}
            colorCustom={true}
          />
        </div>
        <Section
          dataPaymentStatus={dataPaymentStatus}
          dataOrderStatus={dataOrderStatus}
          isAll={isAll}
        />
      </>
    </main>
  );
}
