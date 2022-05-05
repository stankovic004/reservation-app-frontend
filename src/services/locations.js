import axios from "axios";

export function GetLocations() {
    try{
   return axios
      .get("http://localhost:8080/locations")
      .then((response) => {
        let locations = response.data
        for (let i = 0; i < locations.length; i++) {
            locations[i].lat = parseFloat(locations[i].lat)
            locations[i].lon = parseFloat(locations[i].lon)
        }
        return locations
      }).catch(err => {
        console.log(err)
        alert("Greška!")
      });
    }
    catch(err){
      console.log(err);
      
    }
  }