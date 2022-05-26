import React from "react";
import { useStores } from "../Stores/StoresContex";
import { observer } from "mobx-react";
const FormNewLocation = observer(() => {
  const rootStore = useStores();
  return (
    <div>
      <form
        className={`${
          rootStore.showingNewLocationForm ? "formNewLocation-open" : ""
        }  formNewLocation`}
        onSubmit={rootStore.addNewLocation}
      >
        <p className="linkTextInfo">{rootStore.newMarkerError}</p>
        <input
          className="inputNewLocation"
          value={rootStore.newMarkerName}
          placeholder="name - type"
          onChange={rootStore.onChangeMarkerName}
          type="text"
        />
        <input
          className="inputNewLocation"
          value={rootStore.newMarkerLink}
          placeholder="link from wikipedia*"
          onChange={rootStore.onChangeMarkerLink}
          type="text"
        />
        <input
          className="inputNewLocation"
          value={rootStore.newMarkerLat || ""}
          placeholder="latitude**"
          readOnly
          type="text"
        />
        <input
          className="inputNewLocation"
          value={rootStore.newMarkerLng || ""}
          placeholder="longitude**"
          readOnly
          type="text"
        />
        <button className="buttonNewLocation" type="submit">
          Add
        </button>
        <p className="linkTextInfo">*last word in url from english wikipedia</p>
        <p className="linkTextInfo">
          e.g. en.wikipedia.org/wiki/<strong>Barcelona</strong>
        </p>
        <p className="linkTextInfo">**press anywhere on the map.</p>
      </form>
    </div>
  );
});

export default FormNewLocation;
