import { useEffect, useState } from "react";
import "./styles/App.css";
import Header from "./components/Header";
import LeftSidebar from "./components/LeftSidebar";
import Main from "./components/Main";
import RightSidebar from "./components/RightSidebar";

function App() {
  const [upgrades, setUpgrades] = useState([]);

  useEffect(() => {
    async function fetchUpgrades() {
      try {
        const response = await fetch(
          `https://cookie-upgrade-api.vercel.app/api/upgrades`
        );
        const data = await response.json();
        console.log(data);
        setUpgrades(data);
      } catch (error) {
        console.error(error);
        const fallbackResponse = (
          await fetch("../assets/upgrades.json")
        ).json();
        const fallbackData = await fallbackResponse.json();
        console.log(fallbackData);
        setUpgrades(fallbackData);
      }
    }
    fetchUpgrades();
  }, []);

  return (
    <div className="container" aria-live="polite">
      <Header />
      <LeftSidebar />
      <Main />
      <RightSidebar upgrades={upgrades} />
    </div>
  );
}

export default App;
