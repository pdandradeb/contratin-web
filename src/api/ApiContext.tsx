"use client";

import React, { createContext, useContext } from "react";
import Api, { api } from "./Api";

const ApiContext = createContext<Value>({ api });

interface Props {
  children: React.ReactNode;
  url?: string | null;
}

interface Value {
  api: Api;
  url?: string | null;
}

export const ApiProvider = ({ url, children }: Props) => {
  // result
  return <ApiContext.Provider value={{ api }}>{children}</ApiContext.Provider>;
};

export const useContextApi = () => {
  const value = useContext(ApiContext);
  if (!value) throw new Error("Api fora de contexto.");
  return value.api;
};
