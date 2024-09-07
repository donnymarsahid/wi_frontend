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
  const path = buildPathWithQueryParams("/categories", searchParams);

  const { url: urlLogin } = await getData({
    path: "/strapi-google-auth/init",
  });

  const categories: CategoryProps = await getData({
    path: `categories`,
    params: {
      populate: "image",
      "sort[0]": "createdAt:desc",
      "pagination[pageSize]": "6",
    },
  });

  return (
    <html lang="en">
      <link rel="shortcut icon" href="/favicon.ico" />
      <body suppressHydrationWarning={true}>
        <UserProvider>
          <Navbar path={path} loginUrl={urlLogin} categories={categories} />
          <Suspense fallback={<Loading />}>
            <div>{children}</div>
          </Suspense>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
