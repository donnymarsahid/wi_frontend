"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface OpenContextType {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const OpenContext = createContext<OpenContextType>({
  open: false,
  setOpen: () => {},
});

export function useOpen() {
  return useContext(OpenContext);
}

interface OpenProviderProps {
  children: ReactNode;
}

export function OpenProvider({ children }: OpenProviderProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <OpenContext.Provider value={{ open, setOpen }}>
      {children}
    </OpenContext.Provider>
  );
}
