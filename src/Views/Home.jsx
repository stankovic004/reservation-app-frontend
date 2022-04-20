import React , { useState }from "react";
import "../App.css";
import "./Home.css";
// import { render } from "react-dom";
import MyMap from "../Components/MyMap";
import Popup from "../Components/Popup";

function Home() {

  const [popupShown, setPopupShown] = useState(false)

  let showPopup = () => {
    console.log("hello world");
    setPopupShown(true);
  }

  return (
    <div>

      <div class="home">
        <h1>Home</h1>
      </div>

      <div class="mapContainer">
        <div class="map-react">
          <div id="mapTest"></div>
          <MyMap lat={46.38917665137211} lon={16.422676581675546} zoom={11} showPopupFunc={showPopup}/>
          
        </div>
      </div>
      { popupShown && <Popup setPopupShown={setPopupShown}/>}
      
    </div>
    
  );
}

export default Home;
