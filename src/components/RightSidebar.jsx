import "../styles/RightSidebar.css";
import Upgrades from "./Upgrades";

export default function RightSidebar() {
  return (
    <div id="right-sidebar" className="right-sidebar">
      <h2 className="right-sidebar-text">Store</h2>
      <Upgrades />
    </div>
  );
}
