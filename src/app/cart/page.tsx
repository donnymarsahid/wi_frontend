import dynamic from "next/dynamic";
import { getData } from "../utils/fetching";
import cx from "classnames";
import { poppins } from "../fonts";

const Detail = dynamic(() => import("@/components/cart/detail"), {
  ssr: false,
});

export default async function Cart() {
  const { url: urlLogin } = await getData({
    path: "/strapi-google-auth/init",
  });

  return (
    <main
      className={`container mx-auto p-4 md:px-28 ${cx(
        poppins,
        poppins.className
      )}`}
    >
      <Detail loginUrl={urlLogin} />
    </main>
  );
}
