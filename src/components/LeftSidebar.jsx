import { useEffect, useContext, useState } from "react";
import "../styles/LeftSidebar.css";
import formatter from "../utils/formatter";
import { AppContext } from "../context/AppProvider";
import { upgradeAmounts } from "../utils/activeUpgrades";
import { UpgradesContext } from "../context/UpdatesProvider";
import Switch from "./Switch";

export default function LeftSidebar() {
  let { count, setCount, cps, setCps } = useContext(AppContext);
  const { upgrades, loading, error } = useContext(UpgradesContext);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  function handleClick() {
    setCount(count + 1);
    clickAnimation();
    playAudio("./src/assets/bigcookie.mp3");
  }

  useEffect(() => {
    const myInterval = setInterval(() => {
      let newCps = 0;
      for (let i = 0; i < upgradeAmounts.length; i++) {
        if (upgrades[i]) {
          newCps += upgradeAmounts[i] * upgrades[i].increase;
        }
      }
      setCps(newCps);
      setCount((prevCount) => prevCount + newCps);
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, [upgrades, setCps, setCount]);

  // Big Cookie related

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  async function clickAnimation() {
    document.getElementById("cookie-image").style.width = "60%";
    await delay(100);
    document.getElementById("cookie-image").style.width = "75%";
  }

  function playAudio(url) {
    if (isAudioEnabled) {
      new Audio(url).play();
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div id="left-sidebar" className="left-sidebar">
      <h2 className="left-sidebar-text">Bakery</h2>
      <p className="left-sidebar-text">Cookies:</p>
      <p className="left-sidebar-text" id="cookieCount">
        {formatter(count)}
      </p>

      <p className="left-sidebar-text">Per Second:</p>
      <p className="left-sidebar-text" id="cookiesPerSecond">
        {formatter(cps)}
      </p>
      <Switch
        label=" Enable Sound"
        isOn={isAudioEnabled}
        handleToggle={() => setIsAudioEnabled(!isAudioEnabled)}
      />
      <img
        src="./src/assets/cookie.webp"
        alt="big cookie"
        id="cookie-image"
        aria-label="Clickable big cookie image"
        onClick={handleClick}
      />
    </div>
  );
}
