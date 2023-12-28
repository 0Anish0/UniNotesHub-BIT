import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertMessage } from "../layout/AlertMessage";
// import styled from "styled-components";  // Import styled-components

// const StyledLoginForm = styled.div`
//   width: 100%;
//   max-width: 400px;
//   margin: auto;
//   padding: 20px;
//   background: rgba(255, 255, 255, 0.1);
//   border-radius: 8px;
//   box-shadow: 111 11 10px rgba(555, 344, 455, 0.9);  // Box shadow added here
// `;

function LoginForm() {
  //Context
  const { loginUser } = useContext(AuthContext);

  //Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;
  const onChangeLoginForm = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  //Login
  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        // history.push("/dashboard");
      } else {
        setAlert({ type: "danger", message: loginData.message });
        setLoginForm({ username: "", password: "" });
        setTimeout(() => setAlert(null), 4000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="m-2" onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            className="mb-2"
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            className="mb-2"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="m-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
}

export default LoginForm;
