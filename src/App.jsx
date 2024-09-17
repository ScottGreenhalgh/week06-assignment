import "./styles/App.css";
import Header from "./components/Header";
import LeftSidebar from "./components/LeftSidebar";
import Main from "./components/Main";
import RightSidebar from "./components/RightSidebar";

function App() {
  return (
    <div className="container" aria-live="polite">
      <Header />
      <LeftSidebar />
      <Main />
      <RightSidebar />
    </div>
  );
}

export default App;
