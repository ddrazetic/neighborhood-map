// import React, { useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { observer } from "mobx-react";
import { useStores } from "../Stores/StoresContex";
import { toJS } from "mobx";

const Map = observer(() => {
  //   useEffect(() => {
  //     console.log(toJS(rootStore.locations));
  //   }, []);
  const rootStore = useStores();
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA1sZafYCyfi56FDX3yzz03aRf8fB7uznA",
  });

  if (loadError) {
    return <div>Map cannot be loaded, sorry!</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={toJS(rootStore.containerStyle)}
      center={rootStore.center}
      zoom={rootStore.zoom}
    >
      <>
        {/* <Marker position={rootStore.center} />
        <Marker position={rootStore.center2} /> */}
        {rootStore.locations.map((store, index) => {
          return (
            <Marker
              key={index}
              id={index}
              animation={window.google.maps.Animation.DROP}
              position={{
                lat: store.lat,
                lng: store.lng,
              }}
              onClick={() => console.log("You clicked me!")}
            />
          );
        })}
      </>
    </GoogleMap>
  ) : null;
});

export default Map;
