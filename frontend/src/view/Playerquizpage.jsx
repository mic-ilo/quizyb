import React, { useState, useEffect } from "react";
// import { useHistory } from 'react-router-dom'; // i removed for now, pero para sa last part ito, once done quiz will be redirected to homepage or dashboard
import "../styles/playerquizpage.css";
import Logo from "../assets/logo.png";
// import UserIcon from "../assets/user-settings.png";
// import LogoutIcon from "../assets/log-out.png";
// import BackIcon from "../assets/back.png";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";

const PlayerQuizPage = (props) => {
  const {
    quizData,
    showSuccessModal,
    selectedAnswers,
    selectedOptions,
    showErrorModal,
    setShowErrorModal,
    computedScore,
    handleCloseModal,
    handleOptionClick,
    handleSubmitQuiz,
  } = props;

  return (
    <div className="playerquizpage-container">
      <img className="logo"  src={Logo} alt="QuizyB logo"/>
      <div className="player-quiz-page">

        {/* Nav Icons */}
        {/* <div className="profile-icons">
          <a onClick={userProfile}>
            <div className="user-profile-icon">
              <img src={UserIcon} alt="User Profile" />
            </div>
          </a>
          <div className="logout-icon" onClick={handleLogout}>
            <img src={LogoutIcon} alt="Logout" />
          </div>

          <div className="back-icon" onClick={backtoDashboard}>
            <img src={BackIcon} alt="Back Icon" />
          </div>
        </div> */}

        <div className="header">{quizData.title}</div>

        {/* Questions Cards */}
        <div className="questions-container">
          {quizData.questions.map((question, index) => (
            <div key={question.id} className="question-card">
              <div className="question-number">Question: {index + 1}</div>

              <div className="question-text">{question.question}</div>

              <div className="options">
                {question.wrongOptions.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`option ${
                      selectedOptions[index] === optionIndex
                        ? "selected"
                        : "unselected"
                    }`}
                    onClick={() => {
                      if (selectedOptions[index] !== optionIndex) {
                        handleOptionClick(index, optionIndex);
                      }
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit section */}
        <div className="submit-container">
          <button className="submit-button" onClick={handleSubmitQuiz}>
            Done Quizzing! 🐝
          </button>
        </div>

        {/* Error Modal */}
        {showErrorModal && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                {" "}
                Oh, honey! You missed some questions. <br/> Go back and complete them to see your score.
              </div>
              <div className="modal-body">
                {[...Array(quizData.questions.length).keys()]
                  .filter((index) => selectedAnswers[index] === undefined)
                  .map((index) => `# ${index + 1}`)
                  .join(", ")}
              </div>

              <div
                className="close-button quiznotdone"
                onClick={() => setShowErrorModal(false)}
              >
                I'll bee on it. Take me back.
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header"> Un-bee-liveable! You've completed the quiz.</div>
              <div className="modal-score">Your Score: {computedScore} / {quizData.questions.length}{" "}
              </div>
              <div className="modal-subheader"> If you have any questions, buzz your quiz builder.</div>
              


              <div className="close-button quizdone" onClick={handleCloseModal}>
                I got my scores. Buzz me out!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

PlayerQuizPage.propTypes = {
  quizData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        question: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        correctAnswer: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default PlayerQuizPage;
