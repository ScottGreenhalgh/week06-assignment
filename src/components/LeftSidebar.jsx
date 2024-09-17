import "../styles/LeftSidebar.css";

export default function LeftSidebar() {
  return (
    <div id="left-sidebar" className="left-sidebar">
      <h2 className="left-sidebar-text">Bakery</h2>
      <p className="left-sidebar-text">Cookies:</p>
      <p className="left-sidebar-text" id="cookieCount"></p>

      <p className="left-sidebar-text">Per Second:</p>
      <p className="left-sidebar-text" id="cookiesPerSecond"></p>
      <img
        src="./src/assets/cookie.webp"
        alt="big cookie"
        id="cookie-image"
        aria-label="Clickable big cookie image"
      />
    </div>
  );
}
