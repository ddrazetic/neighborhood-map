// import React, { useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { observer } from "mobx-react";
import { useStores } from "../Stores/StoresContex";
// import { toJS } from "mobx";

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
      mapContainerClassName="map-container"
      center={rootStore.center}
      zoom={rootStore.zoom}
      onClick={function () {
        rootStore.setActiveMarker("");
      }}
    >
      <>
        {rootStore.filteredLocations.map((store, index) => {
          return (
            <Marker
              key={index}
              id={index}
              // animation={window.google.maps.Animation.DROP}
              animation={
                rootStore.activeMarker
                  ? store.id === rootStore.activeMarker.id
                    ? "1"
                    : "0"
                  : "0"
              }
              position={{
                lat: store.lat,
                lng: store.lng,
              }}
              onClick={function () {
                rootStore.setActiveMarker(store);
                // console.log(this);
              }}
            />
          );
        })}
      </>
    </GoogleMap>
  ) : null;
});

export default Map;
