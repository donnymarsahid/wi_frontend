"use client";

import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import Link from "next/link";
import { STRAPI_URL } from "@/app/utils/constans";

type ModalLoginProps = {
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
  urlImage: string;
};

const ModalImage = ({ openModal, setOpenModal, urlImage }: ModalLoginProps) => {
  const [modalPlacement, setModalPlacement] = useState("center");

  return (
    <>
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
              src="/assets/images/logo-horizontal-upd.png"
              width={200}
              height={200}
              alt="logo-horizontal"
            />
          </div>
        </Modal.Header>
        <Modal.Body className="bg-white">
          <div className={`  ${cx(poppins, poppins.className)}`}>
            <Image
              src={`${STRAPI_URL}${urlImage}`}
              width={400}
              height={400}
              alt="image"
              className="w-full md:h-[500px] h-[300px] object-cover"
            />
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
    </>
  );
};

export default ModalImage;
