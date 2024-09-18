import "../styles/Upgrades.css";
import IndividualUpgrade from "./IndividualUpgrade";

export default function Upgrades({ upgrades }) {
  return (
    <div id="upgrades-container">
      {upgrades.map((upgrade) => (
        <IndividualUpgrade key={upgrade.id} upgrades={upgrade} />
      ))}
    </div>
  );
}
