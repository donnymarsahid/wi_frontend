"use client";

import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import Link from "next/link";

type ModalLoginProps = {
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
  loginUrl: string;
};

const ModalLogin = ({ openModal, setOpenModal, loginUrl }: ModalLoginProps) => {
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
              loading="lazy"
              src="/assets/images/logo-horizontal.png"
              width={200}
              height={200}
              alt="logo-horizontal"
            />
          </div>
        </Modal.Header>
        <Modal.Body className="bg-white">
          <div className={`  ${cx(poppins, poppins.className)}`}>
            <div className="flex justify-center flex-col mb-4">
              <h1 className="font-bold text-center text-[26px]">MASUK</h1>
              <p className="font-medium text-justify text-sm text-[#B0B5BF]">
                Mulai menggunakan layanan yang diberikan oleh wallpaper
                indonesia silahkan masuk dengan akun anda
              </p>
            </div>
            <Link
              href={loginUrl}
              className="duration-20 mb-6 flex w-full items-center border-2 border-blue-400 bg-blue-400 font-medium text-white transition hover:bg-blue-200 hover:text-blue-400"
            >
              <div className="flex items-center justify-center bg-white p-2">
                <Image
                  loading="lazy"
                  unoptimized
                  src="/assets/images/logo-google.png"
                  width={25}
                  height={25}
                  alt="logo-google"
                />
              </div>
              <div className="w-full">
                <p className="md:text-md text-center text-sm">
                  Masuk menggunakan akun google
                </p>
              </div>
            </Link>
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

export default ModalLogin;
