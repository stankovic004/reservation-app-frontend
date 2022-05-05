import React, { useState } from "react";
import "../App.css";
import "./Home.css";
// import { render } from "react-dom";
import MyMap from "../Components/MyMap";
import Popup from "../Components/Popup";

function Home() {
  const [popupShown, setPopupShown] = useState(false);

  const [locationSelected, setLocationSelected] = useState({});

  let showPopup = () => {
    console.log("hello world");
    setPopupShown(true);
    console.log(locationSelected);
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
          <div id="mapTest"></div>
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
        />
      )}
    </div>
  );
}

export default Home;
