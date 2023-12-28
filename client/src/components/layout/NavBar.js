import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import logoutIcon from "../../assets/logout.svg";
import Logo from "../../assets/logo.png";

function NavBar() {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow">
      <Navbar.Brand className="font-weight-bolder text-white">
        {/* <img src="" alt="" /> */}
        <img
          src={Logo}
          alt="learnItLogo"
          width="32"
          height="32"
          className="mr-2"
          style={{ border: "2px solid white", borderRadius: "50%" }}
        />
        UniNotes<span style={{ color: "#FFD700" }}>Hub</span>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/dashboard"
            as={Link}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>

        <Nav className="">
          <Nav.Link className="font-weight-bolder text-white">
            Welcome {username.toUpperCase()}
          </Nav.Link>
          <Button
            variant="danger"
            className="font-weight-bolder text-white"
            onClick={logout}
          >
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="32"
              height="32"
              className="mr-2"
            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
