import dynamic from "next/dynamic";
import { getData } from "../utils/fetching";
import cx from "classnames";
import { poppins } from "../fonts";
import { AboutProps } from "@/types/about";
import Detail from "@/components/cart/detail";

export default async function Cart() {
  const { url: urlLogin } = await getData({
    path: "/strapi-google-auth/init",
  });

  const about: AboutProps = await getData({
    path: `about`,
    params: {
      "fields[0]": "no_telp_admin_order",
    },
  });

  return (
    <main
      className={`container mx-auto p-4 md:px-28 ${cx(
        poppins,
        poppins.className
      )}`}
    >
      <Detail loginUrl={urlLogin} about={about} />
    </main>
  );
}
