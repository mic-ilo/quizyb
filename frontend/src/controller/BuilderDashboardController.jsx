import { useNavigate } from "react-router-dom";
import Builderdashboard from "../view/Builderdashboard.view";
import { useState, useEffect } from "react";
import QuizModel from "../model/QuizModel";
import jwtDecode from "jwt-decode";

export default function BuilderDashboardController() {
  const navigate = useNavigate();
  const [currentQuizzes, setCurrentQuizzes] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [username, setUsername] = useState("");
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const jwtToken = localStorage.getItem("token");
        const decodedToken = jwtDecode(jwtToken);
        const decodedId = decodedToken._id;
        const decodedUsername = decodedToken.username;
        const capitalizedUsername =
          decodedUsername.charAt(0).toUpperCase() + decodedUsername.slice(1);
        setUsername(capitalizedUsername);
        const userQuizzes = await QuizModel.getQuizzes(decodedId);
        setCurrentQuizzes(userQuizzes);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    }
    fetchData();
  }, []);
  const fetchPlayerData = async (quizId) => {
    try {
      const playersData = await QuizModel.getResultByQuiz(quizId);
      setPlayerData(playersData);
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };
  useEffect(() => {
    setIsEmpty(currentQuizzes.length === 0);
  }, [currentQuizzes]);

  const userProfileButton = () => {
    navigate("/userprofile");
  };

  const createQuizButton = () => {
    navigate("/builder/quizform");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <Builderdashboard
        userProfile={userProfileButton}
        createQuiz={createQuizButton}
        quizzes={currentQuizzes}
        handleLogout={handleLogout}
        isEmpty={isEmpty}
        username={username}
        onViewMoreClick={fetchPlayerData}
        playerData={playerData}
      />
    </div>
  );
}
