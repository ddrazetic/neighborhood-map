import { autorun, makeAutoObservable, toJS } from "mobx";

class RootStore {
  center = {
    lat: 45.54768486675738,
    lng: 18.698328490729086,
  };

  zoom = 16;

  locations = [
    {
      id: 1,
      name: "McDonald's - food",
      nameLink: "McDonald%27s",
      lat: 45.55083330391221,
      lng: 18.693082371696782,
    },
    {
      id: 2,
      name: "dm - cosmetics",
      nameLink: "Dm-drogerie_markt",
      lat: 45.55143038849984,
      lng: 18.696078454047157,
    },
    {
      id: 3,
      name: "Spar - store",
      nameLink: "SPAR_(retailer)",
      lat: 45.5500229503587,
      lng: 18.692632655771277,
    },
    {
      id: 4,
      name: "Müller - cosmetics",
      nameLink: "Müller_(store)",
      lat: 45.546459523991814,
      lng: 18.709641155059742,
    },
    {
      id: 5,
      name: "IKEA - furniture",
      nameLink: "IKEA",
      lat: 45.542984431744536,
      lng: 18.68881878214098,
    },
    {
      id: 6,
      name: "Konzum - store",
      nameLink: "Konzum",
      lat: 45.55095016426026,
      lng: 18.69598254513013,
    },
    {
      id: 7,
      name: "Kaufland - store",
      nameLink: "Kaufland",
      lat: 45.54450589797251,
      lng: 18.709384694091177,
    },
  ];

  activeMarker = [];
  showingList = true;
  showingNewLocationForm = false;
  loading = false;
  error = "";
  contents = [];
  newMarkerLat = null;
  newMarkerLng = null;
  newMarkerName = "";
  newMarkerLink = "";
  newMarkerError = "";
  url =
    "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=";

  searchInput = "";
  filteredLocations = this.locations;

  constructor() {
    makeAutoObservable(this);
    this.autoSave();
  }
  showNewLocationForm = () => {
    this.showingNewLocationForm = !this.showingNewLocationForm;
    this.setActiveMarker("");
    this.setNewMarkerLocation(null, null);
    // console.log(toJS(this.locations.length));
    // console.log(toJS(this.locations[-1].id) + 1);
  };
  addNewLocation = (e) => {
    e.preventDefault();
    if (
      this.newMarkerLat &&
      this.newMarkerLng &&
      this.newMarkerName &&
      this.newMarkerLink
    ) {
      this.newMarkerError = "";
      this.locations.push({
        id: this.locations.length + 1,
        name: this.newMarkerName,
        nameLink: this.newMarkerLink,
        lat: this.newMarkerLat,
        lng: this.newMarkerLng,
      });
      this.filteredLocations = this.locations;
      this.searchInput = "";
      this.newMarkerLat = null;
      this.newMarkerLng = null;
      this.newMarkerName = "";
      this.newMarkerLink = "";
    } else {
      this.newMarkerError = "Please fill all fields!";
    }
    console.log(this.newMarkerError);
  };

  onChangeMarkerName = (e) => {
    this.newMarkerName = e.target.value;
    // console.log(this.newMarkerName);
  };
  onChangeMarkerLink = (e) => {
    this.newMarkerLink = e.target.value;
    // console.log(this.newMarkerLink);
  };

  autoSave = () => {
    const storedJsonLocations = localStorage.getItem("locations");
    if (storedJsonLocations) {
      this.locations = JSON.parse(storedJsonLocations);
    }
    const storedJsonFilteredLocations =
      localStorage.getItem("filteredLocations");
    if (storedJsonFilteredLocations) {
      this.filteredLocations = JSON.parse(storedJsonFilteredLocations);
    }
    const storedJsonInput = localStorage.getItem("searchInput");
    if (storedJsonInput) {
      this.searchInput = JSON.parse(storedJsonInput);
    }
    autorun(() => {
      localStorage.setItem("locations", JSON.stringify(this.locations));
      localStorage.setItem(
        "filteredLocations",
        JSON.stringify(this.filteredLocations)
      );

      localStorage.setItem("searchInput", JSON.stringify(this.searchInput));
    });
  };

  setActiveMarker = (marker) => {
    this.activeMarker.id !== marker.id
      ? (this.activeMarker = marker)
      : (this.activeMarker = "");
    if (this.activeMarker) {
      this.getContents();
    }
  };
  setShowingList = () => {
    this.showingList = !this.showingList;
  };
  setNewMarkerLocation = (lat, lng) => {
    this.newMarkerLat = lat;
    this.newMarkerLng = lng;

    // console.log("lat: " + this.newMarkerLat + "\nlong: " + this.newMarkerLng);
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
    this.setActiveMarker("");
  };

  setContents = (value) => {
    this.contents = value;
  };
  setError = (value) => {
    this.error = value;
  };
  setLoading = (value) => {
    this.loading = value;
  };

  extractAPIContents = (json) => {
    const { pages } = json.query;
    return Object.keys(pages).map((id) => pages[id].extract);
  };

  getContents = async () => {
    let resp;
    let contents = [];
    this.setLoading(true);
    try {
      resp = await fetch(this.url + this.activeMarker.nameLink);

      const json = await resp.json();
      // console.log(json.query.pages[-1]);
      // if (json.query.pages[-1].pageid) return;

      contents = this.extractAPIContents(json);
    } catch (err) {
      this.setError(err);
      console.log(err);
      alert(err);
    } finally {
      this.setLoading(false);
    }
    this.setContents(contents);
    // console.log(this.contents);
  };
}

export default RootStore;
