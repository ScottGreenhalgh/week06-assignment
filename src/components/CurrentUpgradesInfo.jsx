import { upgradeAmounts } from "../utils/activeUpgrades";

export default function CurrentUpgradesInfo({ upgrade }) {
  return (
    <p id={`upgrade-${upgrade.id}`} className="active-upgrade">
      {`${upgrade.name}: ${upgradeAmounts[upgrade.id - 1]} (CPS: ${
        upgradeAmounts[upgrade.id - 1] * upgrade.increase
      })`}
    </p>
  );
}
