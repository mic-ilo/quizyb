import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HomePage from "../view/Homepage.view";

//view

export default function HomepageController() {
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false); //pass this as value to disabled button in view
  const [signupLoading, setSignupLoading] = useState(false); //pass this as value to disabled button in view

  const loginButton = () => {
    setLoginLoading(true);
    navigate("/login");
    setLoginLoading(false);
  };

  const signupButton = () => {
    setSignupLoading(true);
    navigate("/signup");
    setSignupLoading(false);
  };

  return (
    <>
      <HomePage login={loginButton} signup={signupButton} />
    </>
  );
}
