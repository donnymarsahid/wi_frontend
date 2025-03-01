"use client";
import { Breadcrumbs } from "@/components/atoms/breadcrumbs";

export default function InternalServerError() {
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <main className="container mx-auto p-4 md:px-28">
      <>
        <div className="border-2 border-blue-400 bg-blue-400 p-4 lg:flex lg:items-center lg:justify-between">
          <h3 className="text-2xl text-white">Checkout</h3>
          <Breadcrumbs
            breadcrumbs={[
              { label: "Beranda", href: "/" },
              { label: "Checkout" },
            ]}
            colorCustom={true}
          />
        </div>
        <section className="w-full items-center justify-center border-2 border-gray-200 p-2 lg:flex lg:p-6">
          <div className="h-screen ">
            <div className="flex h-full flex-col items-center justify-center">
              <h1 className="text-2xl">Internal Server Error!</h1>
              <button
                onClick={handleRefresh}
                className="rounded-lg bg-blue-400 p-2 text-white hover:bg-blue-300"
              >
                Refresh Halaman
              </button>
            </div>
          </div>
        </section>
      </>
    </main>
  );
}
