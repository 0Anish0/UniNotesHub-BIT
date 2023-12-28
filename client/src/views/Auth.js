import React, { useContext } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { LandingStyle } from "../styles/Landing.style";
import { AuthContext } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function Auth({ authRoute }) {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;

  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (isAuthenticated) return <Redirect to="/dashboard" />;
  else
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );
  return (
    <LandingStyle>
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>UniNotes<span>Hub</span></h1>
          <h4>Read, Write & Share</h4>
          {body}
        </div>
      </div>
    </LandingStyle>
  );
}

export default Auth;
