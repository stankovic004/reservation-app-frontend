import React from "react";
import "./App.css";
import Nav from "./Views/Nav";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Admin from "./Views/Admin";
import Home from "./Views/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
