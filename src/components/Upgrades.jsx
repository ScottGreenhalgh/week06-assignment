import { useEffect, useState, useContext } from "react";
import "../styles/Upgrades.css";
import IndividualUpgrade from "./IndividualUpgrade";
import fetchUpgrades from "../utils/api";
import { AppContext } from "../context/AppProvider";
import { upgradeAmounts } from "../utils/activeUpgrades";

export default function Upgrades() {
  let { count, setCount } = useContext(AppContext);
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

  function clickedUpgrade(id) {
    const clickedUpgrade = upgrades.find((upgrade) => upgrade.id === id);

    if (!clickedUpgrade) {
      console.log("The clicked button wasn't valid");
      return;
    }
    console.log(`Upgrade ${clickedUpgrade.name} selected`);
    if (clickedUpgrade.cost > count) {
      console.log("Could not afford upgrade");
      return;
    }
    count -= clickedUpgrade.cost;
    setCount(count);
    upgradeAmounts[id - 1]++;
    console.log(upgradeAmounts);
  }

  return (
    <div id="upgrades-container">
      {upgrades.map((upgrade) => (
        <IndividualUpgrade
          key={upgrade.id}
          upgrade={upgrade}
          onClick={() => clickedUpgrade(upgrade.id)}
        />
      ))}
    </div>
  );
}
