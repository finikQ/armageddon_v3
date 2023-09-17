"use client";

import { Asteroid } from "@/types/types";
import { createContext, useState, FC } from "react";

export interface AppState {
  cartItems: Asteroid[];
}

export interface AppStateContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

// TODO: Fix types
export const AppStateContext = createContext<any>(null);

export const AppStateProvider: any = ({ children }: any) => {
  const initialState: AppState = {
    cartItems: [],
  };

  const [state, setState] = useState<AppState>(initialState);

  return (
    <AppStateContext.Provider value={{ state, setState }}>
      {children}
    </AppStateContext.Provider>
  );
};
