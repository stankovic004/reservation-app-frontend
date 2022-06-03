import "../App.css";
import "./Admin.css";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { AddLocation } from "../services/auth";

function Admin() {
  const [name, setName] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    AddLocation(name, lat, lon);
  }

  return (
    <div>
      <br></br>
      <h2>Dodaj novu lokaciju</h2>

      <div className="container">
        <div className="itemsContainer">
          <Form className="formContainer" onSubmit={handleSubmit}>
            <Form.Group size="lg" className="formContent" controlId="name">
              <Form.Label>Ime:</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" className="formContent" controlId="lon">
              <Form.Label>Lon: </Form.Label>
              <Form.Control
                value={lon}
                onChange={(e) => setLon(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" className="formContent" controlId="lat">
              <Form.Label>Lat: </Form.Label>
              <Form.Control
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </Form.Group>
            <Button block size="lg" type="submit" className="buttonConfirm">
              Dodaj
            </Button>
          </Form>
        </div>
        <p>
          <a href="https://www.latlong.net/"> Pronađi koordinate! </a>
        </p>
      </div>
    </div>
  );
}

export default Admin;
