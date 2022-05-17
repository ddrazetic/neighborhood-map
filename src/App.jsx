import React from "react";
import { observer } from "mobx-react";
import Map from "./Components/Map";

const App = observer(() => {
  return (
    <div>
      <Map />
    </div>
  );
});

export default App;
