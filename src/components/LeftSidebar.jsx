import { useEffect, useContext } from "react";
import "../styles/LeftSidebar.css";
import formatter from "../utils/formatter";
import { AppContext } from "../context/AppProvider";

export default function LeftSidebar() {
  let { count, setCount, cps } = useContext(AppContext);

  function handleClick() {
    setCount(count + 1);
  }

  useEffect(() => {
    //console.log("useEffect running");
    const myInterval = setInterval(() => {
      //console.log("This is running interval");
      setCount((count) => count + 1 * cps);
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, [cps, setCount]);

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
