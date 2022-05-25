import React from "react";
import Hamburger from "../Icons/more.png";
import { useStores } from "../Stores/StoresContex";
import { observer } from "mobx-react";
const Navbar = observer(() => {
  const rootStore = useStores();

  return (
    <nav className="navbar">
      <h3 className="headerText">
        {!rootStore.showingList ? "Neighborhood Map" : "NM"}
      </h3>
      <button onClick={rootStore.setShowingList} className="hamburgerButton">
        <img className="hamburgerImage" src={Hamburger} alt="hamburger"></img>
      </button>
    </nav>
  );
});

export default Navbar;
