import { makeAutoObservable } from "mobx";
// import { makeAutoObservable, runInAction } from "mobx";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
class RootStore {
  number = 9;
  containerStyle = {
    width: "100p%",
    height: "100vh",
  };

  center = {
    lat: 45.54768486675738,
    lng: 18.698328490729086,
  };
  center2 = {
    lat: 45.55483330391221,
    lng: 18.693082371696782,
  };
  zoom = 16;

  // locations = [
  //   {
  //     lat: 45.55083330391221,
  //     lng: 18.693082371696782,
  //   },
  //   {
  //     lat: 45.54915214648205,
  //     lng: 18.69235816982313,
  //   },
  // ];
  locations = [
    {
      // name: "McDonald's Drinska",
      lat: 45.55083330391221,
      lng: 18.693082371696782,
    },
    {
      // name: "Restoran Karaka Osijek",
      lat: 45.54915214648205,
      lng: 18.69235816982313,
    },
    {
      // name: "Pizzeria Novi Saloon",
      lat: 45.54455258753893,
      lng: 18.69288106317513,
    },
    {
      // name: "Restoran Strossmayer No. 2",
      lat: 45.550806210558626,
      lng: 18.705525005122915,
    },
    {
      // name: "Pizzeria Sebastian",
      lat: 45.55016141430503,
      lng: 18.700676556401163,
    },
    {
      // name: "Pizzeria La Rosa",
      lat: 45.54899221255438,
      lng: 18.69656896165396,
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  plus = () => {
    this.number = this.number + 1;
  };
}

export default RootStore;
