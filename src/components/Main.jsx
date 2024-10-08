import "../styles/Main.css";
import CookieNotice from "./CookieNotice";
import CurrentUpgrades from "./CurrentUpgrades";
import Save from "./Save";

export default function Main() {
  return (
    <main id="main" className="main">
      <div className="information">
        <h2>How to play</h2>
        <p>
          Click the big cookie on the left to bake cookies. Invest these cookies
          on upgrades on the right to increase production and generate even more
          cookies. Try to reach the highest of upgrades and see how many cookies
          you can bake per second.
        </p>
      </div>
      <div className="information">
        <h3>Save your progress</h3>
        <p>
          To never lose a single cookie from the bakery, the game saves
          automatically every 60 seconds, however you can manually save anytime
          by clicking the button below.
        </p>
        <Save />
      </div>

      <CurrentUpgrades />
      <CookieNotice />
    </main>
  );
}
