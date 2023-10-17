import PlayerQuizPage from "../view/Playerquizpage.jsx";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import QuizModel from "../model/QuizModel";

function PlayerQuizPageController() {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [error, setError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // close-open of Success pop-up
  const [selectedAnswers, setSelectedAnswers] = useState([]); // store selected answersss
  const [selectedOptions, setSelectedOptions] = useState([]); // store selected options [0, 1, 2, 3]
  const [showErrorModal, setShowErrorModal] = useState(false); // close-open of Error pop-up

  const [computedScore, setComputedScore] = useState(0); // store computed score, draft computation logic muna

  const location = useLocation();

  useEffect(() => {
    setQuizData(location.state.data);
  }, []);

  // HANDLE ANSWER SELECTION
  const handleOptionClick = (questionIndex, selectedOptionIndex) => {
    //store selected options as index for greening of selected choice
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = selectedOptionIndex;
    setSelectedOptions(newSelectedOptions);

    //store selected answer in array to pass on form submit
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] =
      quizData.questions[questionIndex].wrongOptions[selectedOptionIndex];
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmitQuiz = () => {
  // Check if there are any unanswered questions
  const hasUnansweredQuestion = selectedAnswers.some(
    answer => answer === undefined || answer.trim() === ''
  );

  // Check if the number of selected answers matches the total number of questions
  const allQuestionsAnswered = selectedAnswers.filter(answer => answer !== null).length === quizData.questions.length;

  if (hasUnansweredQuestion || !allQuestionsAnswered) {
    setShowErrorModal(true);
    } else {
      // Compute score
      let score = 0;

      //access the correctAnswer answer from quizData.questions.correctAnswer
      //access the selected answer from selectedAnswers
      //compare the two
      //if equal, increment score
      for (let i = 0; i < quizData.questions.length; i++) {
        if (quizData.questions[i].correctAnswer === selectedAnswers[i]) {
          score++;
        }
      }

      setComputedScore(score);
      setShowSuccessModal(true); // Shows Success pop-up, quiz done + scores

      // Get playerID from local storage
      const jwtToken = localStorage.getItem("token");
      const decodedToken = jwtDecode(jwtToken);

      // Get quizID from json
      const quizID = quizData.quizId;

      // submit score
      const quizResults = {
        quizId: quizID,
        user: {
          userId: decodedToken._id,
          username: decodedToken.username,
        },
        totalScore: score,
      };

      QuizModel.postQuizResult(quizID, quizResults);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/player/dashboard");
  };
  return (
    <>
      {quizData ? (
        <PlayerQuizPage
          quizData={quizData}
          showSuccessModal={showSuccessModal}
          selectedAnswers={selectedAnswers}
          selectedOptions={selectedOptions}
          showErrorModal={showErrorModal}
          setShowErrorModal={setShowErrorModal}
          computedScore={computedScore}
          handleCloseModal={handleCloseModal}
          handleOptionClick={handleOptionClick}
          handleSubmitQuiz={handleSubmitQuiz}
        />
      ) : (
        <p>No quiz data found!</p>
      )}
    </>
  );
}

export default PlayerQuizPageController;
