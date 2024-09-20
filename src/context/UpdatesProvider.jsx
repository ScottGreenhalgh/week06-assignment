import { createContext, useState, useEffect, useMemo, useRef } from "react";
import fetchUpgrades from "../utils/api";

export const UpgradesContext = createContext();

export function UpgradesProvider({ children }) {
  const [upgrades, setUpgrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    let isMounted = true;

    async function getUpgrades() {
      if (hasFetched.current) return;
      hasFetched.current = true;
      try {
        if (isMounted) {
          const data = await fetchUpgrades();
          setUpgrades(data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      }
    }
    getUpgrades();

    return () => {
      isMounted = false;
    };
  }, []);

  const contextValue = useMemo(
    () => ({ upgrades, loading, error }),
    [upgrades, loading, error]
  );

  return (
    <UpgradesContext.Provider value={contextValue}>
      {children}
    </UpgradesContext.Provider>
  );
}
