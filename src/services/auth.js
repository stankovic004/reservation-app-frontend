import axios from "axios";
// import { FormText } from "react-bootstrap";

let loggedInUser = "";

export function GetLoggedInUser() {
  return loggedInUser;
}

export function RegisterUser(email, username, password) {
  try {
    axios
      .post("http://localhost:8080/register", { username, email, password })
      .then((response) => {
        alert("Korisnik kreiran!");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        alert("Greška kod kreiranja korisnika!");
      });
  } catch (err) {
    console.log(err);
  }
}

export function AddLocation(name, lon, lat) {
  try {
    axios
      .post("http://localhost:8080/addLocation", { name, lon, lat })
      .then((response) => {
        alert("Lokacija dodana!");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        alert("Greška kod dodavanja lokacije!");
      });
  } catch (err) {
    console.log(err);
  }
}

export function UserLogin(email, password) {
  try {
    return axios
      .post("http://localhost:8080/login", { email, password })
      .then((response) => {
        console.log(response);
        loggedInUser = response.data.username;
        return {
          success: true,
          username: response.data.username,
          role: response.data.role,
        };
      })
      .catch((err) => {
        console.log(err);
        return { success: false };
      });
  } catch (err) {
    console.log(err);
    return false;
  }
}

export function MakeReservation(username, date, times, location) {
  try {
    axios
      .post("http://localhost:8080/reserve", {
        username,
        date,
        times,
        location,
      })
      .then((response) => {
        alert("Uspjeh!");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        alert("Greška!");
      });
  } catch (err) {
    console.log(err);
  }
}
