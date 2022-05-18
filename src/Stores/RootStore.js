import { makeAutoObservable, toJS } from "mobx";
// import { makeAutoObservable, runInAction } from "mobx";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
class RootStore {
  number = 9;
  // containerStyle = {
  //   width: "100p%",
  //   height: "90vh",
  // };

  center = {
    lat: 45.54768486675738,
    lng: 18.698328490729086,
  };
  center2 = {
    lat: 45.55483330391221,
    lng: 18.693082371696782,
  };
  zoom = 16;

  locations = [
    {
      id: 1,
      name: "McDonald's Drinska",
      lat: 45.55083330391221,
      lng: 18.693082371696782,
    },
    {
      id: 2,
      name: "Restoran Karaka Osijek",
      lat: 45.54915214648205,
      lng: 18.69235816982313,
    },
    {
      id: 3,
      name: "Pizzeria Novi Saloon",
      lat: 45.54455258753893,
      lng: 18.69288106317513,
    },
    {
      id: 4,
      name: "Restoran Strossmayer No. 2",
      lat: 45.550806210558626,
      lng: 18.705525005122915,
    },
    {
      id: 5,
      name: "Pizzeria Sebastian",
      lat: 45.55016141430503,
      lng: 18.700676556401163,
    },
    {
      id: 6,
      name: "Pizzeria La Rosa",
      lat: 45.54899221255438,
      lng: 18.69656896165396,
    },
  ];
  activeMarker = [];

  showingList = true;

  searchInput = "";
  // filteredLocations=JSON.parse(localStorage.getItem("filteredLocations"));
  filteredLocations = this.locations;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveMarker = (marker) => {
    this.activeMarker.id !== marker.id
      ? (this.activeMarker = marker)
      : (this.activeMarker = "");
    // marker && console.log(toJS(this.activeMarker));
  };
  setShowingList = () => {
    this.showingList = !this.showingList;
  };

  onChangeSearchInput = (e) => {
    this.setSearchInput(e.target.value);
    // console.log(this.searchInput);
  };

  setSearchInput = (value) => {
    this.searchInput = value;
  };
  filterLocations = (e) => {
    e.preventDefault();
    this.filteredLocations = this.locations.filter((location) =>
      location.name.toLowerCase().includes(this.searchInput.toLowerCase())
    );

    localStorage.setItem(
      "filteredLocations",
      JSON.stringify(this.filteredLocations)
    );
    // console.log(toJS(this.filteredLocations));
  };

  plus = () => {
    this.number = this.number + 1;
  };
}

export default RootStore;
