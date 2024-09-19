import { useState } from "react";
import "../styles/App.css";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import Main from "./Main";
import RightSidebar from "./RightSidebar";

function App() {
  let [count, setCount] = useState(0);
  let [cps, setCps] = useState(0);

  return (
    <div className="container" aria-live="polite">
      <Header />
      <LeftSidebar count={count} setCount={setCount} cps={cps} />
      <Main />
      <RightSidebar />
    </div>
  );
}

export default App;
