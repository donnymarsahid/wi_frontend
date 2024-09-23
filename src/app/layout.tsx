import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { buildPathWithQueryParams } from "@/utils/queryParams";
import { Footer } from "@/components/layout/footer";
import { getData } from "./utils/fetching";
import React, { Suspense } from "react";
import Loading from "./loading";
import { UserProvider } from "@/components/authContext";
import { CategoryProps } from "@/types/categories";
import { FooterProps } from "@/types/footer";
import { CustomerServicesProps } from "@/types/customerServices";
import { BottomBar } from "@/components/layout/bottombar";
import { OpenProvider } from "./lib/openContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Wallpaper Indonesia | Pusat Belanja Online Material Interior di Indonesia",
  description:
    "Wallpaper Indonesia merupakan pusat pembelanjaan online untuk material interior mulai dari Wallpaper, Wallfoam 3D, Vinyl Flooring, Parquet Flooring, Gordyn, Blind dan Carpet Tile. Tersedia dalam beragam motif, warna, dan merek yang sesuai dengan kebutuhan Anda.",
};

type PageProps = {
  searchParams: {
    page: string;
    category: string;
    q: string;
  };
};

export default async function RootLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: PageProps["searchParams"];
}) {
  const path = buildPathWithQueryParams("/products", searchParams);

  const { url: urlLogin } = await getData({
    path: "/strapi-google-auth/init",
  });

  const categories: CategoryProps = await getData({
    path: `categories`,
    params: {
      populate: "image",
      "sort[0]": "date:desc",
    },
  });

  const customerServices: CustomerServicesProps = await getData({
    path: `customer-services`,
  });

  const header: FooterProps = await getData({
    path: `header`,
  });

  const footer: FooterProps = await getData({
    path: `footer`,
  });

  return (
    <html lang="en">
      <link rel="shortcut icon" href="/favicon.ico" />
      <body suppressHydrationWarning={true}>
        <UserProvider>
          <OpenProvider>
            <Navbar
              path={path}
              loginUrl={urlLogin}
              categories={categories}
              customerServices={customerServices}
              header={header}
            />
            <Suspense fallback={<Loading />}>
              <div>{children}</div>
            </Suspense>
            <BottomBar />
            <Footer footer={footer} categories={categories} />
          </OpenProvider>
        </UserProvider>
      </body>
    </html>
  );
}
