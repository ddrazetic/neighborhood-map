import React from "react";
import { useStores } from "../Stores/StoresContex";
import { observer } from "mobx-react";
import Filter from "../Icons/search.png";
import RootStore from "../Stores/RootStore";
const List = observer(() => {
  const rootStore = useStores();
  return (
    <div className={rootStore.showingList ? " list show_list" : "list"}>
      <h4 className="headerList">Locations</h4>
      <button
        className="buttonShowForm"
        onClick={rootStore.showNewLocationForm}
      >
        {rootStore.showingNewLocationForm ? "Close" : "New location"}
      </button>
      {rootStore.showingNewLocationForm && (
        <form className="formNewLocation" onSubmit={rootStore.addNewLocation}>
          <p className="linkTextInfo">{rootStore.newMarkerError}</p>
          <input
            className="inputNewLocation"
            value={rootStore.newMarkerName}
            placeholder="Locations name"
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
            // onChange={rootStore.onChangeMarkerLink}
            type="text"
          />
          <input
            className="inputNewLocation"
            value={rootStore.newMarkerLng || ""}
            placeholder="longitude**"
            readOnly
            // onChange={rootStore.onChangeMarkerLink}
            type="text"
          />
          <button className="buttonNewLocation" type="submit">
            Add
          </button>
          <p className="linkTextInfo">
            *last word in url from english wikipedia
          </p>
          <p className="linkTextInfo">
            e.g. en.wikipedia.org/wiki/<strong>Barcelona</strong>
          </p>
          <p className="linkTextInfo">**press anywhere on the map.</p>
        </form>
      )}

      <form
        className="formSearch"
        onSubmit={rootStore.filterLocations}
        onChange={rootStore.filterLocations}
      >
        <input
          className="inputSearch"
          value={rootStore.searchInput}
          placeholder="Filter restaurants"
          onChange={rootStore.onChangeSearchInput}
          type="text"
        />
        <div className="buttonSearch">
          <img src={Filter} alt="filter" />
        </div>
      </form>
      <div className="containerList">
        <ul>
          {rootStore.filteredLocations.length ? (
            rootStore.filteredLocations.map((store, index) => {
              return (
                <li key={index}>
                  <button
                    onClick={function () {
                      rootStore.setActiveMarker(store);
                    }}
                    className={` ${
                      rootStore.activeMarker.id === store.id
                        ? "active-list"
                        : ""
                    }  button-list `}
                  >
                    {store.name}
                  </button>
                </li>
              );
            })
          ) : (
            <li>No locations</li>
          )}
        </ul>
      </div>
    </div>
  );
});

export default List;
