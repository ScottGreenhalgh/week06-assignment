import { useContext } from "react";
import "../styles/Upgrades.css";
import IndividualUpgrade from "./IndividualUpgrade";
import { AppContext } from "../context/AppProvider";
import { upgradeAmounts } from "../utils/activeUpgrades";
import { UpgradesContext } from "../context/UpdatesProvider";

export default function Upgrades() {
  let { count, setCount } = useContext(AppContext);
  const { upgrades, loading, error } = useContext(UpgradesContext);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
