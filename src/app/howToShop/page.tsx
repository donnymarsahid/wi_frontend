import DetailHowToShop from "@/components/howToShop/content";
import cx from "classnames";
import { poppins } from "../fonts";
import { HowToShopProps } from "@/types/howToShop";
import { getData } from "../utils/fetching";

export default async function HowToShopPage() {
  const howToShop: HowToShopProps = await getData({
    path: `how-to-shop`,
    params: {
      populate:
        "consultation_image,how_to_shop_image,review_cart_image,shipping_method_image,submit_order_image,payment_account_content,payment_account_content.logo",
    },
  });
  return (
    <main
      className={`min-h-screen bg-gray-50 py-10 px-4 md:px-10 ${cx(
        poppins,
        poppins.className
      )}`}
    >
      <DetailHowToShop howToShop={howToShop} />
    </main>
  );
}
