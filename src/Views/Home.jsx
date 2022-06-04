import React, { useState, useEffect } from "react";
import "../App.css";
import "./Home.css";
// import { render } from "react-dom";
import MyMap from "../Components/MyMap";
import Popup from "../Components/Popup";
import PopupTimePicking from "../Components/PopupTimePicking";
import {
  GetReservations,
  GetReservationsFromAPI,
} from "../services/backendCalls";

function Home() {
  const [popupShown, setPopupShown] = useState(false);

  const [searchPopupShown, setSearchPopupShown] = useState(false);

  const [locationSelected, setLocationSelected] = useState({});

  const [reservations, setReservations] = useState([]);

  let showPopup = () => {
    setPopupShown(true);
  };

  let openSearchPopup = () => {
    setSearchPopupShown(true);
  };

  useEffect(() => {
    GetReservationsFromAPI().then((reservations) => {
      setReservations(reservations);
      console.log(reservations);
    });
  }, []);

  const btnSearch = {
    display: "flex",
    float: "right",
    marginBottom: 5,
  };

  return (
    <div>
      <div className="home">
        <h1>
          <br></br>
        </h1>
      </div>

      <div className="mapContainer">
        <div className="map-react">
          <button
            style={btnSearch}
            onClick={() => {
              setSearchPopupShown(true);
            }}
          >
            Traži po terminu
          </button>

          <MyMap
            lat={46.38917665137211}
            lon={16.422676581675546}
            zoom={11}
            showPopupFunc={showPopup}
            setLocationSelected={setLocationSelected}
          />
        </div>
      </div>
      {popupShown && (
        <Popup
          setPopupShown={setPopupShown}
          locationSelected={locationSelected}
          reservations={reservations}
        />
      )}
      {searchPopupShown && (
        <PopupTimePicking
          setSearchPopupShown={setSearchPopupShown}
          reservations={reservations}
        />
      )}
    </div>
  );
}

export default Home;
