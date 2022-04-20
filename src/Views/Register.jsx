import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";
import { RegisterUser } from "../services/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      confPassword.length > 0 &&
      password === confPassword
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    RegisterUser(email, username, password);
  }

  // const formGroupLeftFloater = {
  //   display: "flex",
  //   justifyContent: "spaceBetween",
  //   // backgroundColor: "red",
  //   float: "left",
  //   paddingBottom: 15,
  // };

  return (
    <div className="whole">
      <div className="LoginContainer">
        <div className="Login">
          <div className="TopContainer">
            <div className="Text">
              <h1>Registriraj se</h1>
            </div>

            <div className="BackDrop"></div>
          </div>

          {/* <div className="formContainer"> */}
          <Form className="formContainer" onSubmit={handleSubmit}>
            <Form.Group size="lg" className="formGroup" controlId="email">
              <Form.Label>Email:⠀⠀⠀</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" className="formGroup" controlId="username">
              <Form.Label>Username:⠀⠀⠀</Form.Label>
              <Form.Control
                autoFocus
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" className="formGroup" controlId="password">
              <Form.Label>Password: </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" className="formGroup" controlId="password">
              <Form.Label>Confirm password:⠀ </Form.Label>
              <Form.Control
                type="password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              block
              size="lg"
              className="registerButton"
              type="submit"
              disabled={!validateForm()}
            >
              Register
            </Button>
          </Form>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Register;
