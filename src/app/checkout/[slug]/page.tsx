import { poppins } from "@/app/fonts";
import { getData } from "@/app/utils/fetching";
import { Breadcrumbs } from "@/components/atoms/breadcrumbs";
import InternalServerError from "@/components/atoms/internalservererror";
import Detail from "@/components/checkout/detail";
import { AboutProps } from "@/types/about";
import { OrdersProps } from "@/types/orders";
import cx from "classnames";

type Slug = { params: { slug: string } };

export default async function Checkout({ params }: Slug) {
  const orderData: OrdersProps = await getData({
    path: `orders`,
    params: {
      populate:
        "bukti_transfer,ongkir,shippingAddress,orderItems,orderItems.products,users_permissions_users",
      "filters[id][$eq]": params.slug,
    },
    revalidate: 0,
  });

  const about: AboutProps = await getData({
    path: "about",
    params: {
      populate: "logo,backgroundTemplate,others,linked",
    },
    revalidate: 0,
  });

  let flexTransactionTenMillion = false;
  if (orderData?.data?.length) {
    const getAllOrder: OrdersProps = await getData({
      path: `orders`,
      params: {
        populate:
          "bukti_transfer,ongkir,shippingAddress,orderItems,orderItems.products,users_permissions_users",
        "filters[users_permissions_users[0].id][$eq]":
          orderData?.data[0].attributes.users_permissions_users?.data[0].id,
        "filters[orderStatus][$eq]": "Selesai",
      },
      revalidate: 0,
    });

    let total = 0;
    for (const item of getAllOrder?.data) {
      const nominal = item?.attributes.grandTotal
        ? parseFloat(item.attributes.grandTotal)
        : 0;
      total += nominal;
    }

    // if (total > 10000000) flexTransactionTenMillion = true;
    flexTransactionTenMillion = true;
  }

  return (
    <main className={`${cx(poppins, poppins.className)}`}>
      <Detail
        orderData={orderData}
        flexTransactionTenMillion={flexTransactionTenMillion}
        about={about}
      />
    </main>
  );
}
