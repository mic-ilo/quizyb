import React from "react";
import Logo from "../assets/logo.png";

const SidebarGuide = (props) => {
  const { backToDashboard } = props;
  
  return (
    <div className="sidebar">
      
      <div className="instructions">
        <img className="sidebar-logo" src={Logo} alt="QuizyB logo"/>
        <h3 className="sidebar-heading">Build your quiz easy as 1-2-3!</h3>
        <p className="sidebar-paragraph">
          Create max of 12 buzzworthy questions.
        </p>
        <p className="sidebar-paragraph">
          Include one correct answer and three crafted wrong options.
        </p>
        <p className="sidebar-paragraph">
          Generate a unique quiz code that serves as key to your quiz hive.
        </p>
        <p className="sidebar-paragraph">
          Share the code with friends, colleagues, or students for them to join
          your quiz.
        </p>
        <p
          className="sidebar-paragraph"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          <strong> Let the quizzing begin! </strong>
        </p>
      </div>
      <button className="back-to-dashboard" onClick={backToDashboard}>
        My Dashboard
      </button>


    </div>
  );
};

export default SidebarGuide;
