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
import Script from "next/script";
// import GoogleTagManager from "@/components/GoogleTagManager";

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
        {/* Meta Pixel Script */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1280292583433659');
            fbq('track', 'PageView');
          `}
        </Script>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=GTM-W8ZTLQL8'+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W8ZTLQL8');
          `}
        </Script>
        {/* End Google Tag Manager */}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KMCYHQV6GM"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-KMCYHQV6GM');
  `}
        </Script>

        {/* Google Tag tambahan dari tim SEO */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GT-5MR682C7"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag-5MR682C7" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GT-5MR682C7');
  `}
        </Script>
      </head>
      <body suppressHydrationWarning={true}>
        {/* GTM NoScript */}
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5NM4ZX6G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript> */}

        {/* GTM Script */}
        {/* <GoogleTagManager /> */}

        {/* NoScript Fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1280292583433659&ev=PageView&noscript=1"
          />
        </noscript>

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W8ZTLQL8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

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
