// import React, { useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { observer } from "mobx-react";
import { useStores } from "../Stores/StoresContex";

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

  return (
    isLoaded && (
      <GoogleMap
        mapContainerClassName="map-container"
        center={rootStore.center}
        zoom={rootStore.zoom}
        onClick={function () {
          rootStore.setActiveMarker("");
        }}
      >
        {rootStore.activeMarker.lat && (
          <InfoWindow
            position={{
              lat: parseFloat(rootStore.activeMarker.lat + 0.0007),
              lng: parseFloat(rootStore.activeMarker.lng),
            }}
            onCloseClick={() => {
              rootStore.setActiveMarker("");
            }}
          >
            <div>
              {!rootStore.loading ? (
                rootStore.contents.map((content) => (
                  <div key={1} dangerouslySetInnerHTML={{ __html: content }} />
                ))
              ) : (
                <p>loading...</p>
              )}
            </div>
          </InfoWindow>
        )}
        {rootStore.filteredLocations.map((store, index) => {
          return (
            <Marker
              key={index}
              id={index}
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
              }}
            ></Marker>
          );
        })}
      </GoogleMap>
    )
  );
});

export default Map;
