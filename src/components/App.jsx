import "../styles/App.css";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import Main from "./Main";
import RightSidebar from "./RightSidebar";
import { AppProvider } from "../context/AppProvider";
import { UpgradesProvider } from "../context/UpdatesProvider";

function App() {
  return (
    <AppProvider>
      <UpgradesProvider>
        <div className="container" aria-live="polite">
          <Header />
          <LeftSidebar />
          <Main />
          <RightSidebar />
        </div>
      </UpgradesProvider>
    </AppProvider>
  );
}

export default App;
