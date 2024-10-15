import React from "react";
import { ProvinciesProps, ResultProvincies } from "@/types/provincies";
import Section from "@/components/profile/address/section";
import { getData } from "@/app/utils/fetching";
import cx from "classnames";
import { poppins } from "@/app/fonts";

export default async function Address() {
  const listProvincies: ProvinciesProps = await getData({
    path: `rajaongkir/provincies`,
    revalidate: 0,
  });

  return (
    <main
      className={`lg:mt-[0px] mt-[180px] container mx-auto p-4 md:px-28 ${cx(
        poppins,
        poppins.className
      )}`}
    >
      <Section listProvincies={listProvincies.rajaongkir.results} />
    </main>
  );
}
