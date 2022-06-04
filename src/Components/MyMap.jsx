import React, { useEffect, useRef, useState } from "react";
import { GetLocations } from "../services/backendCalls";
// import {fromLonLat, toLonLat} from 'ol/proj';

const ol = window.ol;
function MyMap(props) {
  const [olMap, setOlMap] = useState();
  const [locations, setLocations] = useState([]);
  // const pos = window.ol.proj.fromLonLat([props.lon, props.lat]);

  function initMap() {
    let map = new window.ol.Map({
      target: "map",
      layers: [
        new window.ol.layer.Tile({ source: new window.ol.source.OSM() }),
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([props.lon, props.lat]),
        zoom: props.zoom || 6,
      }),
    });
    map.on("click", function (e) {
      map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        console.log({
          id: feature.values_.id,
          name: feature.values_.name,
        });
        props.setLocationSelected({
          id: feature.values_.id,
          name: feature.values_.name,
        });

        props.showPopupFunc();
      });
    });
    setOlMap(map);
  }

  function getFeatures() {
    var features = [];
    for (var i = 0; i < locations.length; i++) {
      var iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(
          ol.proj.transform(
            [locations[i].lon, locations[i].lat],
            "EPSG:4326",
            "EPSG:3857"
          )
        ),
        name: locations[i].name,
        id: locations[i].id,
      });

      var iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 1],
          src: "http://cdn.mapmarker.io/api/v1/pin?text=P&size=50&hoffset=1",
        }),
      });

      iconFeature.setStyle(iconStyle);
      features.push(iconFeature);
    }
    return features;
  }

  useEffect(() => {
    initMap();
    GetLocations().then((loc) => {
      setLocations(loc);
    });
  }, []);

  useEffect(() => {
    if (!olMap) {
      return;
    }
    let features = getFeatures();
    var vectorSource = new ol.source.Vector({
      features: features,
    });
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
    });
    olMap.addLayer(vectorLayer);
  }, [locations]);

  return (
    <>
      <div id="map" className="map"></div>
      <div style={{ display: "none" }}>
        <div id="marker" title="Marker" onClick={props.showPopupFunc}></div>
      </div>
    </>
  );
}

export default MyMap;
