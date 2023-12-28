import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertMessage } from "../layout/AlertMessage";

function RegisterForm() {
  //LOAD CONTEXT
  const { registerUser } = useContext(AuthContext);

  //Local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword } = registerForm;
  const onChangeForm = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  //REGISTER
  const register = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Passwords do not match" });
      setRegisterForm({ ...registerForm, password: "", confirmPassword: "" });
      setTimeout(() => setAlert(null), 4000);
      return;
    }
    try {
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
        // history.push("/dashboard");
      } else {
        setAlert({ type: "danger", message: registerData.message });
        setRegisterForm({ username: "", password: "", confirmPassword: "" });
        setTimeout(() => setAlert(null), 4000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="m-2" onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            className="mb-2"
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeForm}
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
            onChange={onChangeForm}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            className="mb-2"
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChangeForm}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to="/Login">
          <Button variant="info" size="sm" className="m-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
}

export default RegisterForm;
