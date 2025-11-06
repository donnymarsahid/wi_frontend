"use client";
import { STRAPI_URL } from "@/app/utils/constans";
import { HowToShopProps } from "@/types/howToShop";
import Image from "next/image";
import MarkdownComponent from "../atoms/markdown";

type DetailHowToShopProps = {
  howToShop: HowToShopProps;
};

export default function DetailHowToShop({ howToShop }: DetailHowToShopProps) {
  return (
    <section className="max-w-6xl mx-auto space-y-12">
      {/* Bagian atas - Konsultasi */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-full md:w-1/3">
          <Image
            src={
              STRAPI_URL +
              howToShop.data.attributes.consultation_image.data.attributes.url
            } // ganti dengan path gambar kamu
            alt="Sales Team"
            width={400}
            height={300}
            className="rounded-2xl border border-cyan-300"
          />
        </div>
        <div className="flex-1 text-center md:text-left md:text-[35px] text-[20px] font-light">
          <MarkdownComponent
            markdown={howToShop.data.attributes.consultation_desc}
          />
          <a
            href={`https://api.whatsapp.com/send?phone=${howToShop.data.attributes.consultation_no_telp}&text=Halo%20Admin%20Wallpaper%20Indonesia`}
            target="_blank"
            rel="noopener noreferrer"
            className="
            mt-4
        inline-flex items-center gap-2 
        bg-white border border-black 
        text-black font-bold text-lg 
        px-5 py-2.5 rounded-lg
        shadow-[3px_3px_0px_rgba(0,0,0,0.25)]
        hover:translate-y-[1px] hover:shadow-[1px_1px_0px_rgba(0,0,0,0.25)]
        transition-all duration-150
      "
          >
            <Image
              src="/assets/icons/logos_whatsapp-icon.svg"
              width={25}
              height={25}
              alt="wa-logo"
            />
            Hubungi kami
          </a>
        </div>
      </div>

      {/* Judul utama */}
      <div className="flex justify-center items-center bg-[#e4e4e4] rounded-[10px] p-6">
        <Image
          src="/assets/images/carabelanja.png"
          width={1000}
          height={1000}
          alt="carabelanja"
          className="md:w-[550px] w-[300px] h-[full]"
        />
      </div>

      {/* Step 1 */}
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h3 className="font-bold md:text-2xl text-lg mb-2">
            {howToShop.data.attributes.how_to_shop_title}
          </h3>
          <div className="md:w-[350px] w-[150px] h-[3.5px] bg-[#57d0fb] mb-2"></div>
          <p className="text-gray-700 md:text-lg text-sm leading-relaxed">
            {howToShop.data.attributes.how_to_shop_desc}
          </p>
        </div>
        <Image
          src={
            STRAPI_URL +
            howToShop.data.attributes.how_to_shop_image.data.attributes.url
          }
          alt="Add to Cart"
          width={500}
          height={300}
          className="rounded-lg "
        />
      </div>

      {/* Step 2 */}
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <Image
          src={
            STRAPI_URL +
            howToShop.data.attributes.review_cart_image.data.attributes.url
          }
          alt="Cart Review"
          width={500}
          height={300}
          className="rounded-lg  order-2 md:order-1"
        />
        <div className="order-1 md:order-2">
          <h3 className="font-bold md:text-2xl text-lg mb-2">
            {howToShop.data.attributes.review_cart_title}
          </h3>
          <div className="md:w-[350px] w-[150px] h-[3.5px] bg-[#10d4a2] mb-2"></div>
          <p className="text-gray-700 md:text-lg text-sm leading-relaxed">
            {howToShop.data.attributes.review_cart_desc}
          </p>
        </div>
      </div>

      {/* Step 3 */}
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h3 className="font-bold md:text-2xl text-lg mb-2">
            {howToShop.data.attributes.shipping_method_title}
          </h3>
          <div className="md:w-[350px] w-[150px] h-[3.5px] bg-[#57d0fb] mb-2"></div>
          <p className="text-gray-700 md:text-lg text-sm leading-relaxed">
            {howToShop.data.attributes.shipping_method_desc}
          </p>
        </div>
        <Image
          src={
            STRAPI_URL +
            howToShop.data.attributes.shipping_method_image.data.attributes.url
          }
          alt="Delivery"
          width={500}
          height={300}
          className="rounded-lg "
        />
      </div>

      {/* Step 4 */}
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="flex justify-center items-center order-2 md:order-1">
          <Image
            src={
              STRAPI_URL +
              howToShop.data.attributes.submit_order_image.data.attributes.url
            }
            alt="Submit Order"
            width={200}
            height={100}
            className="rounded-lg"
          />
        </div>
        <div className="order-1 md:order-2">
          <h3 className="font-bold md:text-2xl text-lg mb-2">
            {howToShop.data.attributes.submit_order_title}
          </h3>
          <div className="md:w-[350px] w-[150px] h-[3.5px] bg-[#10d4a2] mb-2"></div>
          <p className="text-gray-700 md:text-lg text-sm leading-relaxed">
            {howToShop.data.attributes.submit_order_desc}
          </p>
        </div>
      </div>

      {/* Bagian rekening */}
      <div className="pt-10">
        <h3 className="font-bold md:text-2xl text-lg mb-4">
          {howToShop.data.attributes.payment_account_title}
        </h3>
        <div className="md:w-[350px] w-[150px] h-[3.5px] bg-[#57d0fb] mb-8"></div>
        {howToShop.data.attributes.payment_account_content.map(
          (item, index) => (
            <div className="flex flex-col items-center gap-3" key={index}>
              <div>
                <Image
                  src={STRAPI_URL + item.logo.data.attributes.url}
                  alt="BCA"
                  width={1000}
                  height={1000}
                  className="md:w-[300px] w-[250px] h-full"
                />
              </div>
              <div className="bg-[#57d0fb] px-4 rounded-full">
                <p className="text-white font-bold md:text-[40px] text-[30px]">
                  {item.no_rek}
                </p>
              </div>
              <div>
                <h1 className="md:text-[40px] text-[16px]">
                  {" "}
                  {item.account_number}
                </h1>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
