import "../styles/App.css";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import Main from "./Main";
import RightSidebar from "./RightSidebar";
import { AppProvider } from "../context/AppProvider";

function App() {
  return (
    <AppProvider>
      <div className="container" aria-live="polite">
        <Header />
        <LeftSidebar />
        <Main />
        <RightSidebar />
      </div>
    </AppProvider>
  );
}

export default App;
