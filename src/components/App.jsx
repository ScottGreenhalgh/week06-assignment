import "../styles/App.css";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import Main from "./Main";
import RightSidebar from "./RightSidebar";

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
