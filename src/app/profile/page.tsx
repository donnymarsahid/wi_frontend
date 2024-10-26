import React from "react";
import dynamic from "next/dynamic";
import { UserProps } from "@/types/users";
import { ProvinciesProps, ResultProvincies } from "@/types/provincies";
import { CitiesProps, Result } from "@/types/cities";
import { getData } from "../utils/fetching";
import cx from "classnames";
import { poppins } from "../fonts";

const Section = dynamic(() => import("@/components/profile/section"), {
  ssr: false,
});

export default async function Profile() {
  const listProvincies: ProvinciesProps = await getData({
    path: `rajaongkir/provincies`,
    revalidate: 60,
  });

  return (
    <main
      className={`container mx-auto p-4 md:px-28 ${cx(
        poppins,
        poppins.className
      )}`}
    >
      <Section listProvincies={listProvincies.rajaongkir.results} />
    </main>
  );
}
