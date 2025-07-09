"use client";

import Script from "next/script";

const GoogleTagManager = () => {
  return (
    <Script
      src="https://www.googletagmanager.com/gtm.js?id=GTM-5NM4ZX6G"
      strategy="afterInteractive"
    />
  );
};

export default GoogleTagManager;
