import Categories from "@/components/home/categories";
import Clients from "@/components/home/clients";
import Hero from "@/components/home/hero";
import PromoAndProduct from "@/components/home/promoandproduct";
import Socmed from "@/components/home/socmed";
import VideoAndImplementation from "@/components/home/videoandimplementation";
import Image from "next/image";

export default function Home() {
  return (
    <main className="mt-[100px]">
      <Hero />
      <Categories />
      <PromoAndProduct />
      <VideoAndImplementation />
      <Clients />
      <Socmed />
    </main>
  );
}
