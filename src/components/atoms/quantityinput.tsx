"use client";

import {
  getDecryptedLocalStorage,
  setEncryptedLocalStorage,
} from "@/lib/utils";
import { useCartProvider } from "@/utils/cartProvider";
import { useState } from "react";

type SectionQuantityInput = {
  price: number;
  index: number;
  quantityData: number;
  minimumQuantity?: number | null;
};

export const QuantityInput = ({
  price,
  index,
  quantityData,
  minimumQuantity,
}: SectionQuantityInput) => {
  const [quantity, setQuantity] = useState(quantityData);
  const { totalProductCart, setTotalProductCart, totalCart, setTotalCart } =
    useCartProvider();

  const increment = () => {
    setQuantity(quantity + 1);
    setTotalProductCart(totalProductCart + 1);
    setTotalCart(
      parseFloat(totalCart.toString()) + parseFloat(price.toString()),
    );

    const updatedCartDataFormula = JSON.parse(
      getDecryptedLocalStorage(localStorage.getItem("dataCart")) || "null",
    );

    const updatedCartData = updatedCartDataFormula;

    const itemToUpdate = updatedCartData[index];

    itemToUpdate.quantity += 1;

    // gramatur start
    const resultWeight =
      itemToUpdate.productWeightOriginal * itemToUpdate.quantity;
    itemToUpdate.productWeight = resultWeight;
    // gramatur end

    updatedCartData[index] = itemToUpdate;

    localStorage.setItem(
      "dataCart",
      setEncryptedLocalStorage(JSON.stringify(updatedCartData)) ?? "",
    );
  };

  const decrement = () => {
    if (typeof window !== "undefined") {
      if (quantity > (minimumQuantity ?? 1)) {
        setQuantity(quantity - 1);
        setTotalProductCart(totalProductCart - 1);
        setTotalCart(
          parseFloat(totalCart.toString()) - parseFloat(price.toString()),
        );

        const updatedCartDataFormula = JSON.parse(
          getDecryptedLocalStorage(localStorage.getItem("dataCart")) || "null",
        );

        const updatedCartData = updatedCartDataFormula;

        const itemToUpdate = updatedCartData[index];

        itemToUpdate.quantity -= 1;

        // gramatur start
        const resultWeight =
          itemToUpdate.productWeightOriginal * itemToUpdate.quantity;
        itemToUpdate.productWeight = resultWeight;
        // gramatur end

        updatedCartData[index] = itemToUpdate;

        localStorage.setItem(
          "dataCart",
          setEncryptedLocalStorage(JSON.stringify(updatedCartData)) ?? "",
        );
      }
    }
  };

  return (
    <div className="flex w-[105px] items-center rounded-lg border border-gray-200">
      <button className="w-[35px] text-gray-400" onClick={decrement}>
        -
      </button>
      <div>
        <input
          className="w-[70px] border-none text-center text-xs"
          type="number"
          value={quantity}
          readOnly
        />
      </div>
      <button className="w-[35px] text-gray-400" onClick={increment}>
        +
      </button>
    </div>
  );
};
