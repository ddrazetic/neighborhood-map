import React from "react";
import { useStores } from "../Stores/StoresContex";
import Filter from "../Icons/search.png";

import { observer } from "mobx-react";
const FormSearch = observer(() => {
  const rootStore = useStores();

  return (
    <div>
      {" "}
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
    </div>
  );
});

export default FormSearch;
