"use client";
import React from "react";
import { Dialog } from "@headlessui/react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { STRAPI_URL } from "@/app/utils/constans";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: any[];
  startIndex: number;
}

export default function GalleryModal({
  isOpen,
  onClose,
  images,
  startIndex,
}: GalleryModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-[999999]"
    >
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-full max-w-5xl p-4 bg-transparent">
          <ImageGallery
            items={images.map((img) => ({
              original: STRAPI_URL + img?.attributes?.url,
              thumbnail: STRAPI_URL + img?.attributes?.url,
              //   description: `${img?.attributes?.url}`,
            }))}
            startIndex={startIndex}
            showPlayButton={false}
            showFullscreenButton={false}
            showThumbnails={true}
            slideDuration={350}
          />
          <button
            onClick={onClose}
            className="absolute top-5 right-5 bg-white text-black px-3 py-1 rounded-md shadow"
          >
            ✕
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
