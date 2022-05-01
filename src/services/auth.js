import axios from "axios";
// import { FormText } from "react-bootstrap";


export function RegisterUser(email, username, password) {
  try{
  axios
    .post("http://localhost:8080/register", { username, email, password })
    .then((response) => {
      alert("Korisnik kreiran!")
      console.log(response);
    }).catch(err => {
      console.log(err)
      alert("Greška kod kreiranja korisnika!")
    });
  }
  catch(err){
    console.log(err);
    
  }
}

export function UserLogin(email, password) {
  try{
  axios
    .post("http://localhost:8080/login", {email, password })
    .then((response) => {
      alert("Uspjeh!")
      console.log(response);
    }).catch(err => {
      console.log(err)
      alert("Pogrešno korisničko ime ili lozinka!")
    });
  }
  catch(err){
    console.log(err);
    
  }
}

export function Reservation(username, date, times, location) {
  try{
  axios
    .post("http://localhost:8080/reserve", {username, date, times, location })
    .then((response) => {
      alert("Uspjeh!")
      console.log(response);
    }).catch(err => {
      console.log(err)
      alert("Greška!")
    });
  }
  catch(err){
    console.log(err);
    
  }
}