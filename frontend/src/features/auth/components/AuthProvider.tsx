"use client";

import { createContext, useContext } from "react";
import { useAuthSession } from "../hooks/useAuthSession";
import type { AppProviderType } from "../types";

const AppContext = createContext<AppProviderType | undefined>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useAuthSession();

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Context harus dibungkus dalam AppProvider.");
  }
  return context;
};

export const useMyApp = useAuth;
