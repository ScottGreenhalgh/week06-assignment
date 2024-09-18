import "../styles/IndividualUpgrades.css";

function numberWithCommas(number) {
  return new Intl.NumberFormat().format(number);
}

export default function IndividualUpgrade({ upgrade }) {
  return (
    <div
      id={upgrade.id}
      className="upgrade-buttons"
      aria-label={`${upgrade.name} upgrade`}
    >
      <p id={`name-${upgrade.id}`}>{upgrade.name}</p>
      <p id={`cost-${upgrade.id}`}>
        {`Cost: ${numberWithCommas(upgrade.cost)}`}
      </p>
      <p id={`increase-${upgrade.id}`}>
        {`CPS: ${numberWithCommas(upgrade.increase)}`}
      </p>
    </div>
  );
}
