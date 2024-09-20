import { useContext } from "react";
import CurrentUpgradesInfo from "./CurrentUpgradesInfo";
import { UpgradesContext } from "../context/UpdatesProvider";
import { AppContext } from "../context/AppProvider";

export default function CurrentUpgrades() {
  const { upgrades, loading, error } = useContext(UpgradesContext);
  const { cps } = useContext(AppContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div id="current-upgrades" className="information">
      <h3>Current Upgrades</h3>
      <p>Note: CPS is Cookies (baked) Per Second.</p>
      {upgrades.map((upgrade) => (
        <CurrentUpgradesInfo key={upgrade.id} upgrade={upgrade} cps={cps} />
      ))}
    </div>
  );
}
