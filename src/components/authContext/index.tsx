"use client";
import { UserProps } from "@/types/users";
import React, { createContext, useState, useContext, ReactNode } from "react";

type UserContextType = [
  UserProps | undefined,
  React.Dispatch<React.SetStateAction<UserProps | undefined>>
];
const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  const [user, setUser] = context;

  const handleUser = (value: UserProps) => {
    setUser(value);
  };

  return { value: user, setUser: handleUser };
};

type UserProviderProps = {
  children: ReactNode;
  value?: UserProps;
};

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  value,
}) => {
  const [user, setUser] = useState<UserProps | undefined>(value);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};
