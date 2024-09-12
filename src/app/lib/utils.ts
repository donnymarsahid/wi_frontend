import { AES, enc } from "crypto-js";
import Utf8 from "crypto-js/enc-utf8";
import { CRYPTO_SECRET_KEY } from "../utils/constans";
import { DiscountCustom } from "@/types/products";

export const setEncryptedLocalStorage = (value: any) => {
  if (value) {
    const encryptedValue = AES.encrypt(
      JSON.stringify(value),
      CRYPTO_SECRET_KEY
    ).toString();
    return encryptedValue;
  } else return null;
};

export const getDecryptedLocalStorage = (value: any) => {
  if (value) {
    try {
      const decryptedValue = AES.decrypt(value, CRYPTO_SECRET_KEY).toString(
        Utf8
      );
      return JSON.parse(decryptedValue);
    } catch (error) {
      console.error("Error while decrypting:", error);
      return null;
    }
  } else {
    return null;
  }
};

export const formatRupiah = (angka: number) => {
  return "Rp " + angka.toLocaleString("id-ID");
};

export const calculateDiscount = (
  number: number,
  type: string,
  value: number
) => {
  if (type == "discount_percentage") {
    const getNominalPercentage = number * (value / 100);
    return formatRupiah(number - getNominalPercentage);
  } else if (type == "discount_rupiah") {
    return formatRupiah(number - value);
  }
};

export const calculateDiscountNumber = (
  number: number,
  type: DiscountCustom["type"],
  value: DiscountCustom["value"]
): number => {
  if (type === "discount_percentage") {
    const getNominalPercentage = number * (value / 100);
    return number - getNominalPercentage;
  } else if (type === "discount_rupiah") {
    return number - value;
  }

  // Handle other cases or throw an error for unexpected types
  throw new Error(`Unexpected discount type: ${type}`);
};

export const formatNumberToLetter = (number: number) => {
  if (number >= 1000000) {
    return number / 1000000 + "Jt";
  } else if (number >= 1000) {
    return number / 1000 + "Rb";
  } else {
    return number.toString();
  }
};
