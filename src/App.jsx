import React from "react";
import { observer } from "mobx-react";
import Map from "./Components/Map";
import "./Styles/styles.css";
import List from "./Components/List";
import Navbar from "./Components/Navbar";
import { useStores } from "./Stores/StoresContex";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = observer(() => {
  const rootStore = useStores();
  return (
    <div className="main-container">
      <List />
      <div className="navbar_map">
        <Navbar />
        <Map />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
});

export default App;
