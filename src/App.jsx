import React from "react";
import { observer } from "mobx-react";
import Map from "./Components/Map";
import "./Styles/styles.css";
import List from "./Components/List";
import Navbar from "./Components/Navbar";
import { useStores } from "./Stores/StoresContex";
const App = observer(() => {
  const rootStore = useStores();
  return (
    <div className="main-container">
      {rootStore.showingList && <List />}
      <div className="navbar_map">
        <Navbar />
        <Map />
      </div>
    </div>
  );
});

export default App;
