import { useEffect, useState } from "react";
import "../styles/Header.css";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const cookieDark = document.cookie.includes("cookie.dark=true");
    if (cookieDark) {
      toggleDarkMode();
      setIsDarkMode(true);
    }
  }, []);

  function toggleDarkMode() {
    document.getElementById("header").classList.toggle("hdark");
    document.getElementById("right-sidebar").classList.toggle("rdark");
    document.getElementById("left-sidebar").classList.toggle("ldark");
    document.getElementById("main").classList.toggle("mdark");
  }

  function handleToggle() {
    toggleDarkMode();
    if (!isDarkMode) {
      document.cookie = "cookie.dark=true";
    } else {
      document.cookie = "cookie.dark=false";
    }
    setIsDarkMode(!isDarkMode);
  }

  return (
    <header id="header" className="header">
      <p>React Budget Bakery 2024</p>
      <p>1.1-SNAPSHOT</p>
      <button
        id="button-theme-toggle"
        aria-label="toggle dark mode button"
        onClick={handleToggle}
      >
        Toggle Dark
      </button>
    </header>
  );
}
