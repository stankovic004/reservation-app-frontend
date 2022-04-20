import React, { useEffect, useRef, useState } from "react";
// import {fromLonLat, toLonLat} from 'ol/proj';

function MyMap(props) {
  const map = useRef();
  const pos = window.ol.proj.fromLonLat([props.lon, props.lat]);
  

  useEffect(() => {
    const marker = new window.ol.Overlay({
      position: window.ol.proj.fromLonLat([props.lon, props.lat]),
      positioning: 'center-center',
      element: document.getElementById('marker'),
      stopEvent: true,
    });

    const popup = new window.ol.Overlay({
      element: document.getElementById('popup'),
    });
    
    let olMap = new window.ol.Map({
      target: map.current,
      layers: [
        new window.ol.layer.Tile({ source: new window.ol.source.OSM() }),
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([props.lon, props.lat]),
        zoom: props.zoom || 6,
      }),
    });
    olMap.addOverlay(popup);
    olMap.addOverlay(marker);
  }, [props.lat, props.lon, props.zoom]);


  return (
    <>
      <div ref={map} className="map"></div>
      <div id="popup" >Hellooo world!</div>
      <div style={{display: 'none'}}>
        <div id="marker" title="Marker" onClick={props.showPopupFunc}></div>
      </div>
    </>
  );
}

export default MyMap;
