import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  let [count, setCount] = useState(0);
  let [cps, setCps] = useState(0);

  return (
    <AppContext.Provider value={{ count, setCount, cps, setCps }}>
      {children}
    </AppContext.Provider>
  );
}
