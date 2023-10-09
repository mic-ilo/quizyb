import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PlayerDashboard from "../view/Playerdashboard.view";
import QuizModel from "../model/QuizModel";
import jwtDecode from "jwt-decode";

export default function PlayerDashboardController() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [quizCode, setQuizCode] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  //show username

  
  useEffect(() => {
    try {
      const jwtToken = localStorage.getItem("token");
      if (jwtToken) {
        const decodedToken = jwtDecode(jwtToken);
        const decodedUsername = decodedToken.username;
        const capitalizedUsername =
          decodedUsername.charAt(0).toUpperCase() + decodedUsername.slice(1);
        setUsername(capitalizedUsername);
      } else {
        // Handle the case where the token is not present or invalid
        setError(true);
      }
    } catch (error) {
      // Handle the case where decoding fails
      setError(true);
    }
  }, []);

  const handleInputChange = (e) => {
    setQuizCode(e.target.value);
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quizCode === "") {
      setError(true);
      return;
    }

    try {
      await QuizModel.getQuiz(quizCode).then((data) => {
        if (data) {
          for (let i = 0; i < data.questions.length; i++) {
            data.questions[i].wrongOptions.push(
              data.questions[i].correctAnswer
            );
          }

          //shuffle the questions
          for (let i = data.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = data.questions[i];
            data.questions[i] = data.questions[j];
            data.questions[j] = temp;
          }

          //shuffle the choices
          for (let i = 0; i < data.questions.length; i++) {
            for (
              let j = data.questions[i].wrongOptions.length - 1;
              j > 0;
              j--
            ) {
              const k = Math.floor(Math.random() * j);
              const temp = data.questions[i].wrongOptions[j];
              data.questions[i].wrongOptions[j] =
                data.questions[i].wrongOptions[k];
              data.questions[i].wrongOptions[k] = temp;
            }
          }

          //this approach to shuffling the choices and questions means that the shuffling
          //only takes place once, and the order of the questions and choices is the same
          //meaning that putting this in a useEffect in a view
          //means the order will be different
          //on page refresh

          navigate("/player/quizpage", { state: { data: data } });
        } else {
          setError(true);
        }
      });
    } catch (err) {
      setError(true);
    }
  };

  const userProfileButton = () => {
    navigate("/userprofile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <PlayerDashboard
        handleSubmit={handleSubmit}
        error={error}
        quizCode={quizCode}
        handleInputChange={handleInputChange}
        userProfile={userProfileButton}
        handleLogout={handleLogout}
        username={username}
      />
    </div>
  );
}
