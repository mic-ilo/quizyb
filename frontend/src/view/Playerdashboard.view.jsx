import React, { useState } from "react";
import "../styles/playerdashboard.css";
import UserIcon from "../assets/user-settings.png";
import LogoutIcon from "../assets/log-out.png";
import Logo from "../assets/logo.png";

const PlayerDashboard = (props) => {
  const { username ,handleSubmit, handleInputChange, quizCode, userProfile, handleLogout, error } = props;
  const [handleQuizCodeError, setHandleQuizCodeError] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (quizCode === "") {
      setHandleQuizCodeError(true);
      return;
    }
    try {
      await handleSubmit(e);
    }
    catch (err) {
      setHandleQuizCodeError(true);
      console.log(err);
    }
  }

  return (
    <div className="player-dashboard">
      <img className="logo"  src={Logo} alt="QuizyB logo"/>
      {/* Section 1: Headers */}
      <div className="header-section-playerdash">
        <h2>Get your buzz on!</h2>
        <h1>Bee ready for the quiz, {username}.</h1>
      </div>

      {/* User Profile Icon*/}
      <div className="profile-icons">
        <a onClick={userProfile}>
          <div className="user-profile-icon-playerdash">
            <img src={UserIcon} alt="User Profile" />
          </div>
        </a>
        <div className="logout-icon-playerdash" onClick={handleLogout}>
          <img src={LogoutIcon} alt="Logout" />
        </div>
      </div> 

      {/* Section 2: Quiz code */}
      <div className="quiz-code-section">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={quizCode}
            onChange={handleInputChange}
            placeholder="Input your quiz code here"
          />
          <button type="submit">Take the Quiz</button>
          {error && (
            <div className="error-message-playerdash">
              Buzz off! The quiz code doesn't match our hive. Please check & try
              again.
            </div>
          )}
        </form>
      </div>



      {/* Section 3: Player guide */}
      <div className="player-guide-section">
        <h3>Start quizzing as easy as 1-2-3!</h3>
        <ol>
          <li>Read each question carefully before buzzing your answer.</li>
          <li>
            Ensure your internet connection stable for smooth quiz sailing.
          </li>
          <li>Avoid refreshing the page during the quiz to stay on track.</li>
          <li> Hit 'Done Quizzing' to finish up your quiz & see your scores.
          </li>
          <br />
          <li>
            Enjoy the quiz and have a <strong>bee-utiful</strong> time!
          </li>
        </ol>
      </div>
    </div>
  );
};

export default PlayerDashboard;
