import React from "react";
import LoginForm from "../components/auth/LoginForm";
import { useLocation } from "react-router-dom";
import RegisterFrom from "../components/auth/RegisterFrom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
const Auth = () => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  const location = useLocation();

  let body;
  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (isAuthenticated) return <Navigate to="/Dashboard"></Navigate>;

  body = (
    <>
      {location.pathname === "/Login" && <LoginForm></LoginForm>}
      {location.pathname === "/Register" && <RegisterFrom></RegisterFrom>}
    </>
  );

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learn It</h1>
          <h4>Keep track of what you are learning </h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
