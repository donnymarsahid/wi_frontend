import { poppins } from "@/app/fonts";
import { getData } from "@/app/utils/fetching";
import { Breadcrumbs } from "@/components/atoms/breadcrumbs";
import InternalServerError from "@/components/atoms/internalservererror";
import Detail from "@/components/checkout/detail";
import { AboutProps } from "@/types/about";
import { CourierProps } from "@/types/courier";
import { OrdersProps } from "@/types/orders";
import { ProvinciesProps } from "@/types/provincies";
import cx from "classnames";

type tParams = Promise<{ slug: string }>;

export default async function Checkout(props: { params: tParams }) {
  const slug = (await props.params).slug;

  const couriers: CourierProps = await getData({
    path: "rajaongkir/courier",
  });

  const orderData: OrdersProps = await getData({
    path: `orders`,
    params: {
      populate:
        "bukti_transfer,ongkir,shippingAddress,orderItems,orderItems.products,users_permissions_users",
      "filters[id][$eq]": slug,
    },
  });

  const about: AboutProps = await getData({
    path: "about",
    params: {
      populate: "logo,backgroundTemplate,others,linked",
    },
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
    });

    let total = 0;
    for (const item of getAllOrder?.data) {
      const nominal = item?.attributes.grandTotal
        ? parseFloat(item.attributes.grandTotal)
        : 0;
      total += nominal;
    }

    flexTransactionTenMillion = true;
  }

  const listProvincies: ProvinciesProps = await getData({
    path: `rajaongkir/provincies`,
  });

  return (
    <main className={`${cx(poppins, poppins.className)}`}>
      <Detail
        couriers={couriers}
        orderData={orderData}
        flexTransactionTenMillion={flexTransactionTenMillion}
        about={about}
        listProvincies={listProvincies.rajaongkir.results}
      />
    </main>
  );
}
