import Categories from "@/components/home/categories";
import Clients from "@/components/home/clients";
import Hero from "@/components/home/hero";
import PromoAndProduct from "@/components/home/promoandproduct";
import Socmed from "@/components/home/socmed";
import VideoAndImplementation from "@/components/home/videoandimplementation";
import { HomepageProps } from "@/types/homepage";
import Image from "next/image";
import { getData } from "./utils/fetching";
import { CategoryProps } from "@/types/categories";
import { ServiceProps } from "@/types/services";
import { ClientProps } from "@/types/client";
import { PromosProps } from "@/types/promos";
import { ReviewsProps } from "@/types/reviews";
import { FlashSale } from "@/components/atoms/flashsale";
import { FlashSaleProps } from "@/types/flashsale";
import FixedContact from "@/components/atoms/fixedbottomcontact";
import { CustomerServicesProps } from "@/types/customerServices";

export default async function Home() {
  const homepage: HomepageProps = await getData({
    path: `homepage`,
    params: {
      populate: "banners,socmed,socmed.logo",
    },
  });

  const categories: CategoryProps = await getData({
    path: `categories`,
    params: {
      populate: "image",
      "sort[0]": "date:desc",
      "fields[0]": "keyPageCondition",
      "fields[1]": "slug",
      "fields[2]": "image",
      "fields[3]": "title",
    },
  });

  const promos: PromosProps = await getData({
    path: `promos`,
    params: {
      populate: "thumbnail",
      "sort[0]": "date:desc",
    },
  });

  const services: ServiceProps = await getData({
    path: `services`,
    params: {
      populate: "icon",
      "sort[0]": "date:desc",
      "fields[0]": "icon",
      "fields[1]": "desc",
    },
  });

  const reviews: ReviewsProps = await getData({
    path: `reviews`,
    params: {
      populate: "images",
      "sort[0]": "createdAt:desc",
      "fields[0]": "thumbnail",
      "fields[1]": "slug",
      "fields[2]": "username",
      "fields[3]": "desc",
    },
  });

  const clients: ClientProps = await getData({
    path: `clients`,
    params: {
      populate: "logo",
      "sort[0]": "createdAt:desc",
    },
  });

  const flashsale: FlashSaleProps = await getData({
    path: `flashsale`,
    params: {
      populate: "products",
      "filters[active][$eq]": "true",
      "fields[0]": "expiry_date",
      "fields[1]": "products",
    },
  });

  return (
    <main className="mt-[100px] md:mt-[200px] lg:mt-[100px]">
      <Hero homepage={homepage} />
      {flashsale?.data && <FlashSale {...flashsale} />}
      <Categories categories={categories} services={services} />
      <PromoAndProduct promos={promos} />
      <VideoAndImplementation />
      <Clients clients={clients} reviews={reviews} />
      <Socmed homepage={homepage} />
    </main>
  );
}
