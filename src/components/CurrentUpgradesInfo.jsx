import { upgradeAmounts } from "../utils/activeUpgrades";

export default function CurrentUpgradesInfo({ upgrade, cps }) {
  const amount = upgradeAmounts[upgrade.id - 1];
  const cpsValue = amount * upgrade.increase;

  if (amount === 0)
    return <p id={`upgrade-${upgrade.id}`} className="active-upgrade"></p>;

  return (
    <p id={`upgrade-${upgrade.id}`} className="active-upgrade">
      {`${upgrade.name}: ${amount} (CPS: ${cpsValue})`}
    </p>
  );
}
