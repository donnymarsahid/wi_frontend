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

type HomePageProps = {
  searchParams: {
    page: string;
    category: string;
    q: string;
  };
};

export default async function Home({ searchParams }: HomePageProps) {
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
      "sort[0]": "createdAt:desc",
      "pagination[pageSize]": "6",
    },
  });

  const services: ServiceProps = await getData({
    path: `services`,
    params: {
      populate: "icon",
      "sort[0]": "createdAt:desc",
    },
  });

  const clients: ClientProps = await getData({
    path: `clients`,
    params: {
      populate: "logo",
      "sort[0]": "createdAt:desc",
    },
  });

  return (
    <main className="mt-[100px]">
      <Hero homepage={homepage} />
      <Categories categories={categories} services={services} />
      <PromoAndProduct />
      <VideoAndImplementation />
      <Clients clients={clients} />
      <Socmed homepage={homepage} />
    </main>
  );
}
