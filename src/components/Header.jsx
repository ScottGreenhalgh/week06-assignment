import "../styles/Header.css";

export default function Header() {
  return (
    <header id="header" className="header">
      <p>React Budget Bakery 2024</p>
      <p>1.1-SNAPSHOT</p>
      <button id="button-theme-toggle" aria-label="toggle dark mode button">
        Toggle Dark
      </button>
    </header>
  );
}
