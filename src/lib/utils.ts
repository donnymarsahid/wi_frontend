import ms from "ms";
import { CartProps, Discount } from "@/types/cart";
import { AES, enc } from "crypto-js";
import Utf8 from "crypto-js/enc-utf8";
import { CRYPTO_SECRET_KEY } from "@/app/utils/constans";

type OfferTypeProps = {
  quoteTitle: string;
  productType: string;
  productName: string;
  quantity: number;
  size: string;
  materialName: string;
  sideFace: string;
  laminating: string;
  spotUV: string;
  description: string;
  link: string;
};

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()

    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
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
  type: Discount["type"],
  value: Discount["value"] | any
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

export const formatRupiah = (angka: number) => {
  return "Rp " + angka.toLocaleString("id-ID");
};
export const formatNumber = (angka: number) => {
  return angka.toLocaleString("id-ID");
};

export const generateWhatsAppLink = (
  quoteData: CartProps,
  index: number,
  lastIndex: number,
  grandTotal: string,
  orderNumber: string,
  ongkir?: any
) => {
  const firstQuote = quoteData;

  const number = index + 1;

  const messageText = `*Pesanan ${number}*\nNama Produk : ${
    quoteData.detail_product.data[0].attributes.title
  }\nKode Produk : ${
    firstQuote.detail_product.data[0].attributes.product_code
  }\nJumlah : ${firstQuote.quantity}\n${
    firstQuote.detail_product.data[0].attributes.brands.data[0].attributes
      .discount
      ? "Harga Diskon!\n"
      : ""
  }Harga : ${formatRupiah(firstQuote.total_price)}\n\n`;

  let resultNumber = ongkir?.nominalOngkir ? ongkir?.nominalOngkir : 0;

  let ongkirText = "";

  if (ongkir?.courier) {
    ongkirText = `(Jasa Kirim : ${ongkir?.courier})\n(Ongkir : ${formatRupiah(
      ongkir?.nominalOngkir
    )})\n`;
  }

  const lastMessage = `Nomor Pesanan : ${orderNumber}\n*Grand Total : ${formatRupiah(
    parseFloat(grandTotal + resultNumber)
  )}*`;

  const encodedMessage = encodeURIComponent(
    index === lastIndex
      ? `${messageText}${ongkirText}${lastMessage}`
      : messageText
  );

  const finalWhatsAppLink = `${encodedMessage}`;

  return finalWhatsAppLink;
};

export const generateNumber = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(-2);
  const month = currentDate.getMonth() + 1;
  const randomDigits = generateRandomDigits(4);
  const lastFourDigits = ("0000" + (currentDate.getTime() % 10000)).slice(-4);

  // 01 = Online
  // 02 = Offline
  const typeNumber = "01";

  const formattedNumber = `WI${typeNumber}${year}${month}${randomDigits}${lastFourDigits}`;
  return formattedNumber;
};

const generateRandomDigits = (length: number) => {
  let randomDigits = "";
  for (let i = 0; i < length; i++) {
    randomDigits += Math.floor(Math.random() * 10);
  }
  return randomDigits;
};

export const tableHeader = (text = "", center = false) => ({
  text,
  bold: true,
  color: "#1F0E04",
  fontSize: 10,
  fillColor: "#E6934C",
  margin: [3, 3],
  alignment: "center",
});
export const tableHeader_second = (text = "", center = false) => ({
  text,
  bold: true,
  color: "#FFFFFF",
  fontSize: 10,
  fillColor: "#414042",
  margin: [3, 3],
  alignment: "center",
});

export const terbilang = (nominal: number): string => {
  var bilangan = nominal.toString();
  var kalimat = "";
  if (nominal == 0) kalimat = "Nol";
  var angka = new Array(
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0"
  );
  var kata = new Array(
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan"
  );
  var tingkat = new Array("", "Ribu", "Juta", "Milyar", "Triliun");
  var panjang_bilangan = bilangan.length;

  /* pengujian panjang bilangan */
  if (panjang_bilangan > 15) {
    kalimat = "-";
  } else {
    /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
    for (let i = 1; i <= panjang_bilangan; i++) {
      angka[i] = bilangan.substr(-i, 1);
    }

    let i = 1;
    let j = 0;

    /* mulai proses iterasi terhadap array angka */
    while (i <= panjang_bilangan) {
      let subkalimat = "";
      let kata1 = "";
      let kata2 = "";
      let kata3 = "";

      /* untuk Ratusan */
      if (angka[i + 2] != "0") {
        if (angka[i + 2] == "1") {
          kata1 = "Seratus";
        } else {
          kata1 = kata[parseInt(angka[i + 2])] + " Ratus";
        }
      }

      /* untuk Puluhan atau Belasan */
      if (angka[i + 1] != "0") {
        if (angka[i + 1] == "1") {
          if (angka[i] == "0") {
            kata2 = "Sepuluh";
          } else if (angka[i] == "1") {
            kata2 = "Sebelas";
          } else {
            kata2 = kata[parseInt(angka[i])] + " Belas";
          }
        } else {
          kata2 = kata[parseInt(angka[i + 1])] + " Puluh";
        }
      }

      /* untuk Satuan */
      if (angka[i] != "0") {
        if (angka[i + 1] != "1") {
          kata3 = kata[parseInt(angka[i])];
        }
      }

      /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
      if (angka[i] != "0" || angka[i + 1] != "0" || angka[i + 2] != "0") {
        subkalimat = kata1 + " " + kata2 + " " + kata3 + " " + tingkat[j] + " ";
      }

      /* gabungkan variabe sub kalimat (untuk Satu blok 3 angka) ke variabel kalimat */
      kalimat = subkalimat + kalimat;
      i = i + 3;
      j = j + 1;
    }

    /* mengganti Satu Ribu jadi Seribu jika diperlukan */
    if (angka[5] == "0" && angka[6] == "0") {
      kalimat = kalimat.replace("Satu Ribu", "Seribu");
    }
  }
  const result = kalimat.replace(/\s+/g, " ").trim() + " Rupiah";
  return result;
};

export const formatDate = (value: any) => {
  const date = new Date(value);
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${months[monthIndex]} ${day}, ${year}`;
};

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

export const convertToSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};
