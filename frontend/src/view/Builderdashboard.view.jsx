import { useState } from "react";
import "../styles/builderdashboard.css";
import UserIcon from "../assets/user-settings.png";
import LogoutIcon from "../assets/log-out.png";
import Logo from "../assets/logo.png";


const BuilderDashboard = (props) => {
  const { username, userProfile, createQuiz, quizzes, handleLogout, isEmpty, onViewMoreClick, playerData } =
    props;


  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuizDetails, setShowQuizDetails] = useState(false);

  // Function to open the VIEW MORE pop-up
  const openQuizDetails = (quiz) => {
    console.log("Selected Quiz:", quiz);
    setSelectedQuiz(quiz);
    setShowQuizDetails(true);
    onViewMoreClick(quiz._id.toString());
  };

  const modalContent = selectedQuiz ? (
    <div className="modal-content">
      <div className="modal-header">
        <h3>{selectedQuiz.quizTitle}</h3>
      </div>
      <div className="modal-text">
        <ul>
          <li>Quiz ID: {selectedQuiz._id}</li>
          <br />
          <li>Quiz Players and Scores:</li>
          {playerData && playerData.length > 0 ? (
            <li>
              {playerData.map((player) => (
                <li key={player.username}>
                   {player.username}: {player.totalScore}
                </li>
              ))}
            </li>
          ) : (
            <li>No player data available</li>
          )}
        </ul>
      </div>
      <div className="button-container">
      <button className="close-button" onClick={() => setShowQuizDetails(false)}>
        Back to My Hive
      </button>
    </div>
    </div>
  ) : null;

  return (
    <div className= "builderdash-container">
      <img className="logo"  src={Logo} alt="QuizyB logo"/>
      <div className="builder-dashboard">
        
        {/* User Profile Icon */}
        <div className="profile-icons-buildash">
          
          <div className="user-profile-icon-buildash" onClick={userProfile}>
            <img src={UserIcon} alt="User Profile"/>
          </div>
         
          <div className="logout-icon-buildash" onClick={handleLogout}>
            <img src={LogoutIcon} alt="Logout"/>
          </div>
        </div>

        {/* Section 1: Header */}
        <div className="header-section">
          <h2>Get your buzz on!</h2>
          <h1>Ready to build your quiz, {username}?</h1>
        </div>

        {/* Section 2: Create Quiz Button */}
        <div className="create-quiz-section">
          <button className="create-quiz-button" onClick={createQuiz}>
            Create My Quiz
          </button>
        </div>

        {/* Section 3: Quiz List Table */}
        <div className="quiz-list-section">
          <table className="quiz-list">
            <thead>
              <tr>
                <th className="wider-column">QUIZ TITLE</th>
                <th className="wider-column">QUIZ CODE</th>
                <th className="narrower-column">QUIZ PLAYERS</th>
                <th className="narrower-column">QUIZ DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {isEmpty && (
                <tr>
                  <td> - </td>
                  <td>- </td>
                  <td> - </td>
                  <td>
                    <button
                      style={{
                        opacity: 0.5,
                        backgroundColor: "#ccc",
                        color: "#888",
                        cursor: "not-allowed",
                      }}
                    >
                      View More
                    </button>
                  </td>
                </tr>
              )}
              {quizzes.map((quiz) => (
                <tr key={quiz.id}>
                  <td>{quiz.quizTitle}</td>
                  <td>{quiz._id}</td>
                  <td>{quiz.players}</td>
                  <td>
                    <button onClick={() => openQuizDetails(quiz)}>
                      View More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pop-up for quiz details */}
        {showQuizDetails && <div className="modal">{modalContent}</div>}
      </div>
    </div>
  );
};

export default BuilderDashboard;
