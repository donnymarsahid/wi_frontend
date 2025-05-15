"use client";

import { useEffect } from "react";
import Script from "next/script";

const GoogleTagManager = () => {
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("config", "G-35DMH18EFP", { page_path: url });
      }
    };

    // Mengaktifkan GTM pada perubahan halaman
    if (typeof window !== "undefined") {
      handleRouteChange(window.location.pathname);
    }
  }, []);

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5NM4ZX6G');
          `,
        }}
      />

      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-35DMH18EFP"
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-35DMH18EFP');
          `,
        }}
      />
    </>
  );
};

export default GoogleTagManager;
