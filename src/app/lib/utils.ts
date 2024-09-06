import { AES, enc } from "crypto-js";
import Utf8 from "crypto-js/enc-utf8";
import { CRYPTO_SECRET_KEY } from "../utils/constans";

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
