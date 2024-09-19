import { useEffect, useContext, useState } from "react";
import "../styles/LeftSidebar.css";
import formatter from "../utils/formatter";
import { AppContext } from "../context/AppProvider";
import { upgradeAmounts } from "../utils/activeUpgrades";
import fetchUpgrades from "../utils/api";

export default function LeftSidebar() {
  let { count, setCount, cps, setCps } = useContext(AppContext);
  const [upgrades, setUpgrades] = useState([]);
  const [upgradesFetched, setUpgradesFetched] = useState(false);

  useEffect(() => {
    async function getUpgrades() {
      if (!upgradesFetched) {
        const data = await fetchUpgrades();
        setUpgrades(data);
        setUpgradesFetched(true);
      }
    }
    getUpgrades();
  }, [upgradesFetched]);

  function handleClick() {
    setCount(count + 1);
  }

  useEffect(() => {
    const myInterval = setInterval(() => {
      let newCps = 0;
      for (let i = 0; i < upgradeAmounts.length; i++) {
        if (upgrades[i]) {
          newCps += upgradeAmounts[i] * upgrades[i].increase;
        }
      }
      setCps(newCps);
      setCount((prevCount) => prevCount + newCps);
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, [upgrades, setCps, setCount]);

  return (
    <div id="left-sidebar" className="left-sidebar">
      <h2 className="left-sidebar-text">Bakery</h2>
      <p className="left-sidebar-text">Cookies:</p>
      <p className="left-sidebar-text" id="cookieCount">
        {formatter(count)}
      </p>

      <p className="left-sidebar-text">Per Second:</p>
      <p className="left-sidebar-text" id="cookiesPerSecond">
        {formatter(cps)}
      </p>
      <img
        src="./src/assets/cookie.webp"
        alt="big cookie"
        id="cookie-image"
        aria-label="Clickable big cookie image"
        onClick={handleClick}
      />
    </div>
  );
}
