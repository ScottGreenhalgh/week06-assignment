import "../styles/IndividualUpgrades.css";
import formatter from "../utils/formatter";

export default function IndividualUpgrade({ upgrade }) {
  return (
    <div
      id={upgrade.id}
      className="upgrade-buttons"
      aria-label={`${upgrade.name} upgrade`}
    >
      <p id={`name-${upgrade.id}`}>{upgrade.name}</p>
      <p id={`cost-${upgrade.id}`}>{`Cost: ${formatter(upgrade.cost)}`}</p>
      <p id={`increase-${upgrade.id}`}>
        {`CPS: ${formatter(upgrade.increase)}`}
      </p>
    </div>
  );
}
