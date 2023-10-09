import React from "react";
// import { Link } from "react-router-dom";
import Hero from "../components/homepage/Hero";
import Usage from "../components/homepage/Usage";
import Steps from "../components/homepage/Steps";
import Footer from "../components/homepage/Footer";
import "../styles/homepage.css";

const HomePage = (props) => {
  const { login, signup } = props;

  return (
    <div className="homepage-container">
      <div id="home">
        <Hero login={login} signup={signup} />
      </div>
      <div id="usage">
        <Usage />
      </div>
      <div id="steps">
        <Steps />
      </div>
      <div id="footer">
        <Footer login={login} signup={signup} />
      </div>
    </div>
  );
};

export default HomePage;
