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
import { CartDataProvider } from "@/utils/cartProvider";
import { SeoProps } from "@/types/seo";
import FixedContact from "@/components/atoms/fixedbottomcontact";
import GoogleTagManager from "@/components/GoogleTagManager";

export async function generateMetadata(): Promise<Metadata> {
  const seo: SeoProps = await getData({
    path: "seo",
    params: {
      populate: "authors",
    },
  });

  try {
    const { attributes } = seo.data;
    return {
      title: attributes.title,
      description: attributes.description,
      metadataBase: new URL(attributes.metadataBase),
      // themeColor: "#FFF",
      keywords: attributes.keywords,
      authors: [{ url: attributes.authors.url, name: attributes.authors.name }],
      robots: attributes.robots,
    };
  } catch (error) {
    return {
      title:
        "Wallpaper Indonesia | Pusat Belanja Online Material Interior di Indonesia",
      description:
        "Wallpaper Indonesia merupakan pusat pembelanjaan online untuk material interior mulai dari Wallpaper, Wallfoam 3D, Vinyl Flooring, Parquet Flooring, Gordyn, Blind dan Carpet Tile. Tersedia dalam beragam motif, warna, dan merek yang sesuai dengan kebutuhan Anda.",
    };
  }
}

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
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="google-site-verification"
          content="O22Z-eY2MtqN8TftUUf7o5_wmtfTMdeaSjMsRZU4Xd4"
        />
      </head>
      <body suppressHydrationWarning={true}>
        {/* GTM NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5NM4ZX6G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* GTM Script */}
        <GoogleTagManager />

        <UserProvider>
          <OpenProvider>
            <div className="fixed top-0 w-full z-[9999]">
              <Navbar
                path={path}
                loginUrl={urlLogin}
                categories={categories}
                customerServices={customerServices}
                header={header}
              />
            </div>

            <Suspense fallback={<Loading />}>
              <CartDataProvider>
                <FixedContact customerServices={customerServices} />
                <div className="md:mt-[130px] mt-[175px]">{children}</div>
              </CartDataProvider>
            </Suspense>

            <BottomBar />
            <Footer footer={footer} categories={categories} />
          </OpenProvider>
        </UserProvider>
      </body>
    </html>
  );
}
