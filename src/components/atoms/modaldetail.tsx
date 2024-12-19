import React, { useState } from "react";
import { Modal } from "flowbite-react";
import Image from "next/image";
import { CartProps } from "@/types/cart";
import { calculateDiscount, formatNumber, formatRupiah } from "@/lib/utils";
import { STRAPI_URL } from "@/app/utils/constans";
import cx from "classnames";
import { poppins } from "@/app/fonts";

type ModalLoginProps = {
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
  urlImage: string;
  dataCart: CartProps;
};

const ModalDetail = ({
  openModal,
  setOpenModal,
  urlImage,
  dataCart,
}: ModalLoginProps) => {
  const [modalPlacement, setModalPlacement] = useState("center");

  return (
    <Modal
      show={openModal}
      onClose={() => setOpenModal(false)}
      position={modalPlacement}
      className="md:pt-[0px] pt-[180px] z-[9999]"
      dismissible={true}
    >
      <Modal.Header className="bg-white border-b-1">
        <div>
          <Image
            src="/assets/images/logo-horizontal.png"
            width={200}
            height={200}
            alt="logo-horizontal"
          />
        </div>
      </Modal.Header>
      <Modal.Body className="bg-white">
        <div className={`  ${cx(poppins, poppins.className)}`}>
          <table className="text-[10px] md:text-[16px] font-light">
            <tbody>
              <tr>
                <td>Jenis</td>
                <td>: Lantai Vinyl & SPC</td>
              </tr>
              <tr>
                <td>Merk</td>
                <td>
                  :{" "}
                  {dataCart.detail_product.data[0].attributes?.brands?.data[0]
                    ?.attributes?.title || "-"}
                </td>
              </tr>
              <tr>
                <td>Kode</td>
                <td>
                  :{" "}
                  {dataCart.detail_product.data[0].attributes?.product_code ||
                    "-"}
                </td>
              </tr>
              <tr>
                <td>Warna</td>
                <td>
                  :{" "}
                  {dataCart.detail_product.data[0].attributes
                    ?.wallpaper_by_colors?.data[0]?.attributes?.title || "-"}
                </td>
              </tr>
              <tr>
                <td>Motif</td>
                <td>
                  :{" "}
                  {dataCart.detail_product.data[0].attributes
                    ?.wallpaper_by_styles?.data[0]?.attributes?.title || "-"}
                </td>
              </tr>
              <tr>
                <td>Designer</td>
                <td>
                  :{" "}
                  {dataCart.detail_product.data[0].attributes
                    ?.wallpaper_by_designers?.data[0]?.attributes?.title || "-"}
                </td>
              </tr>
              <tr>
                <td className="w-[120px] md:w-[200px]">Ukuran Per Lembar</td>
                <td>
                  : L=
                  {
                    dataCart.detail_product.data[0].attributes.brands.data[0]
                      .attributes.size_width
                  }
                  cm x P=
                  {
                    dataCart.detail_product.data[0].attributes.brands.data[0]
                      .attributes.size_height
                  }
                  cm
                </td>
              </tr>
              <tr>
                <td>Ketebalan</td>
                <td>
                  :{" "}
                  {
                    dataCart.detail_product.data[0].attributes.brands.data[0]
                      .attributes.thickness
                  }
                  mm
                </td>
              </tr>
              <tr>
                <td>Isi Per Box</td>
                <td>
                  :{" "}
                  {
                    dataCart.detail_product.data[0].attributes?.brands?.data[0]
                      ?.attributes?.itemsPerBox
                  }
                  /{" "}
                  {
                    dataCart.detail_product.data[0].attributes?.brands?.data[0]
                      ?.attributes?.sheetsPerUnit
                  }{" "}
                </td>
              </tr>
              <tr>
                <td>Berat</td>
                <td>
                  :{" "}
                  {dataCart.detail_product.data[0].attributes.brands.data[0]
                    .attributes.product_weight || "-"}{" "}
                  kg
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer
        className={`bg-white p-2 border-t-1 flex justify-center ${cx(
          poppins,
          poppins.className
        )}`}
      >
        <button onClick={() => setOpenModal(!openModal)}>
          <h1 className="text-[#44CBEB] font-bold">Tutup</h1>
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetail;
