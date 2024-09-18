import "../styles/RightSidebar.css";
import Upgrades from "./Upgrades";

export default function RightSidebar({ upgrades }) {
  return (
    <div id="right-sidebar" className="right-sidebar">
      <h2 className="right-sidebar-text">Store</h2>
      <Upgrades upgrades={upgrades} />
    </div>
  );
}
