import { useCallback, useContext } from "react";
import "../styles/IndividualUpgrades.css";
import formatter from "../utils/formatter";
import { AppContext } from "../context/AppProvider";

export default function IndividualUpgrade({ upgrade, onClick }) {
  let { count } = useContext(AppContext);

  const buttonHighlighs = useCallback(() => {
    return upgrade.cost > count ? "upgrade-buttons-nocost" : "upgrade-buttons";
  }, [count, upgrade]);

  return (
    <div
      id={upgrade.id}
      className={buttonHighlighs()}
      aria-label={`${upgrade.name} upgrade`}
      onClick={onClick}
    >
      <p id={`name-${upgrade.id}`}>{upgrade.name}</p>
      <p id={`cost-${upgrade.id}`}>{`Cost: ${formatter(upgrade.cost)}`}</p>
      <p id={`increase-${upgrade.id}`}>
        {`CPS: ${formatter(upgrade.increase)}`}
      </p>
    </div>
  );
}
