import fetchUpgrades from "../utils/api";
import { useEffect, useState } from "react";
import CurrentUpgradesInfo from "./CurrentUpgradesInfo";

export default function CurrentUpgrades() {
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

  return (
    <div id="current-upgrades" className="information">
      <h3>Current Upgrades</h3>
      <p>Note: CPS is Cookies (baked) Per Second.</p>
      {upgrades.map((upgrade) => (
        <CurrentUpgradesInfo key={upgrade.id} upgrade={upgrade} />
      ))}
    </div>
  );
}
