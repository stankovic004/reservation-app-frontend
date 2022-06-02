import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { UserLogin } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    UserLogin(email, password).then((res) => {
      if (res.success && res.role == "admin") {
        navigate("/admin");
      } else if (res.success) {
        navigate("/");
      } else {
        alert("Pogrešno korisničko ime ili lozinka!");
      }
    });
  }

  return (
    <div className="whole">
      <div className="LoginContainer">
        <div className="Login">
          <div className="TopContainer">
            <div className="Text">
              <h1>Dobrodošli nazad!</h1>
            </div>

            <div className="BackDrop"></div>
          </div>
          <Form className="formContainer" onSubmit={handleSubmit}>
            <Form.Group size="lg" className="formContent" controlId="email">
              <Form.Label>Email:⠀⠀⠀</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" className="formContent" controlId="password">
              <Form.Label>Password: </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              block
              size="lg"
              type="submit"
              className="buttonLogin"
              disabled={!validateForm()}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
