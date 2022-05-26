import React from "react";
import { useStores } from "../Stores/StoresContex";
import { observer } from "mobx-react";
import FormNewLocation from "./FormNewLocation";
import FormSearch from "./FormSearch";
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
      {/* {rootStore.showingNewLocationForm && <FormNewLocation />} */}
      <FormNewLocation />
      <FormSearch />

      <ul>
        {rootStore.filteredLocations.length ? (
          rootStore.filteredLocations.map((store, index) => {
            return (
              <li key={index}>
                <button
                  onClick={(e) => rootStore.deleteMarkerByID(store.id, e)}
                  className="deleteButton"
                >
                  X
                </button>
                <button
                  onClick={function () {
                    rootStore.setActiveMarker(store);
                  }}
                  className={` ${
                    rootStore.activeMarker.id === store.id ? "active-list" : ""
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
      <div className="marginContainer"></div>
    </div>
  );
});

export default List;
