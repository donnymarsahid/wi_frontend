import React from "react";
import { ProvinciesProps, ResultProvincies } from "@/types/provincies";
import Section from "@/components/profile/address/section";
import { getData } from "@/app/utils/fetching";

export default async function Address() {
  const listProvincies: ProvinciesProps = await getData({
    path: `rajaongkir/provincies`,
    revalidate: 0,
  });

  return (
    <main className="container mx-auto p-4 md:px-28">
      <Section listProvincies={listProvincies.rajaongkir.results} />
    </main>
  );
}
