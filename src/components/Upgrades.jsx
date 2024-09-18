import { useEffect, useState } from "react";
import "../styles/Upgrades.css";
import IndividualUpgrade from "./IndividualUpgrade";
import fetchUpgrades from "../utils/api";

export default function Upgrades() {
  const [upgrades, setUpgrades] = useState([]);

  useEffect(() => {
    async function getUpgrades() {
      const data = await fetchUpgrades();
      setUpgrades(data);
    }
    getUpgrades();
  }, []);
  return (
    <div id="upgrades-container">
      {upgrades.map((upgrade) => (
        <IndividualUpgrade key={upgrade.id} upgrade={upgrade} />
      ))}
    </div>
  );
}
