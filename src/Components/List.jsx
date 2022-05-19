import React from "react";
import { useStores } from "../Stores/StoresContex";
import { observer } from "mobx-react";
import Filter from "../Icons/search.png";
const List = observer(() => {
  const rootStore = useStores();
  return (
    <div className="list">
      <h4 className="headerList">Locations</h4>
      <form className="formSearch" onSubmit={rootStore.filterLocations}>
        <input
          className="inputSearch"
          value={rootStore.searchInput}
          placeholder="Filter restaurants"
          onChange={rootStore.onChangeSearchInput}
          type="text"
        />
        <button className="buttonSearch" type="submit">
          <img src={Filter} alt="filter" />
        </button>
      </form>
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
    </div>
  );
});

export default List;
