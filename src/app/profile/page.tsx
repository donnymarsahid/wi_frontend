import React from "react";
import dynamic from "next/dynamic";
import { UserProps } from "@/types/users";
import { ProvinciesProps, ResultProvincies } from "@/types/provincies";
import { CitiesProps, Result } from "@/types/cities";
import { getData } from "../utils/fetching";
import cx from "classnames";
import { poppins } from "../fonts";
import Section from "@/components/profile/section";

export default async function Profile() {
  let listProvincies: ProvinciesProps | null = null;

  try {
    listProvincies = await getData({ path: `rajaongkir/provincies` });
  } catch (error) {
    console.error("Failed to fetch provinces:", error);
  }

  const results = listProvincies?.rajaongkir?.results;

  if (!results || results.length === 0) {
    return <div className="text-center mt-10">Tidak ada data provinsi.</div>;
  }

  return (
    <main
      className={`container mx-auto p-4 md:px-28 ${cx(
        poppins,
        poppins.className
      )}`}
    >
      <Section listProvincies={results} />
    </main>
  );
}
