import { upgradeAmounts } from "../utils/activeUpgrades";
import { useCallback, useContext, useEffect } from "react";
import { AppContext } from "../context/AppProvider";

export default function Save() {
  let { count, setCount } = useContext(AppContext);

  useEffect(() => {
    if (localStorage.getItem("cookies") != null) {
      console.log("Progress Loaded");
      setCount(JSON.parse(localStorage.getItem("cookies")));
      upgradeAmounts[0] = JSON.parse(localStorage.getItem("autoClicker"));
      upgradeAmounts[1] = JSON.parse(localStorage.getItem("ovenCount"));
      upgradeAmounts[2] = JSON.parse(localStorage.getItem("cookieFarm"));
      upgradeAmounts[3] = JSON.parse(localStorage.getItem("robotBaker"));
      upgradeAmounts[4] = JSON.parse(localStorage.getItem("cookieFactory"));
      upgradeAmounts[5] = JSON.parse(localStorage.getItem("magicFlour"));
      upgradeAmounts[6] = JSON.parse(localStorage.getItem("timeMachine"));
      upgradeAmounts[7] = JSON.parse(localStorage.getItem("quantumOven"));
      upgradeAmounts[8] = JSON.parse(localStorage.getItem("alienTechnology"));
      upgradeAmounts[9] = JSON.parse(
        localStorage.getItem("interdimensionalBaker")
      );
    }
  }, [setCount]);

  const callbackSave = useCallback(() => {
    console.log("Progress Saved");
    localStorage.setItem("cookies", count);
    localStorage.setItem("autoClicker", upgradeAmounts[0]);
    localStorage.setItem("ovenCount", upgradeAmounts[1]);
    localStorage.setItem("cookieFarm", upgradeAmounts[2]);
    localStorage.setItem("robotBaker", upgradeAmounts[3]);
    localStorage.setItem("cookieFactory", upgradeAmounts[4]);
    localStorage.setItem("magicFlour", upgradeAmounts[5]);
    localStorage.setItem("timeMachine", upgradeAmounts[6]);
    localStorage.setItem("quantumOven", upgradeAmounts[7]);
    localStorage.setItem("alienTechnology", upgradeAmounts[8]);
    localStorage.setItem("interdimensionalBaker", upgradeAmounts[9]);
  }, [count]);

  useEffect(() => {
    const myInterval = setInterval(() => {
      callbackSave();
    }, 60_000);
    return () => {
      clearInterval(myInterval);
    };
  }, [callbackSave]);

  return (
    <button id="save-button" aria-label="save button" onClick={callbackSave}>
      Save
    </button>
  );
}
