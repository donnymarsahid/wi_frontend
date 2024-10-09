"use client";

import { createContext, useContext, ReactNode, useState } from "react";

type CartProviderContextType = {
  totalCart: number;
  setTotalCart: (value: number) => void;
  totalProductCart: number;
  setTotalProductCart: (value: number) => void;
};

const CartProvider = createContext<CartProviderContextType | undefined>(
  undefined
);

export const useCartProvider = () => {
  const context = useContext(CartProvider);
  if (!context) {
    throw new Error("useCartProvider harus digunakan di dalam CartProvider");
  }
  return context;
};

export const CartDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [totalCart, setTotalCart] = useState<number>(0);
  const [totalProductCart, setTotalProductCart] = useState<number>(0);

  return (
    <CartProvider.Provider
      value={{ totalCart, setTotalCart, totalProductCart, setTotalProductCart }}
    >
      {children}
    </CartProvider.Provider>
  );
};
