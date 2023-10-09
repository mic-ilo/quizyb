import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import BuilderQuizForm from "../view/Builderquizform.view";
import { useNavigate } from "react-router-dom";
import QuizModel from "../model/QuizModel";
import jwtDecode from "jwt-decode";

export default function BuilderQuizFormController() {
  const navigate = useNavigate();

  // USESTATE FOR POPUPS FOR FINISH QUIZ BUTTON
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showQuizCodeModal, setShowQuizCodeModal] = useState(false);

  //   //QUIZ TITLE CHANGING
  const handleQuizTitleChange = (event) => {
    setQuizData((prevData) => ({
      ...prevData,
      quizTitle: event.target.value,
    }));
  };

const backToDashboard = () => {
  navigate("/builder/dashboard");
}


  const [quizData, setQuizData] = useState({
    _id: uuidv4(),
    quizTitle: "",
    questionObject: [],
  });

  //   //ADDINGCARD, CARD = THE QUESTION OBJECT (QUESTION, 3 WRONG + CORRECT)
  const handleAddCard = (question, wrongOptions, correctAnswer) => {
    const newCard = {
      id: uuidv4(),
      question: question,
      wrongOptions: wrongOptions,
      correctAnswer: correctAnswer,
    };

    setQuizData((prevData) => ({
      ...prevData,
      questionObject: [newCard, ...prevData.questionObject],
    }));
  };

  //DELETING QUESTION CARD FUNCTION
  const handleDeleteQuizCard = (id) => {
    const newCards = quizData.questionObject.filter((card) => card.id !== id);
    setQuizData((prevData) => ({
      ...prevData,
      questionObject: newCards,
    }));
  };

  //EDITING QUESTION CARD FUNCTION
  const handleEditQuizCard = (
    id,
    editedQuestion,
    editedWrongOptions,
    editedCorrectAnswer
  ) => {
    const updatedCards = quizData.questionObject.map((card) =>
      card.id === id
        ? {
            ...card,
            question: editedQuestion,
            wrongOptions: editedWrongOptions,
            correctAnswer: editedCorrectAnswer,
          }
        : card
    );
    setQuizData((prevData) => ({
      ...prevData,
      questionObject: updatedCards,
    }));
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem("quizData", JSON.stringify(data));
  };

  //FINISH QUIZ BUTTON POP UP
  const handleFinishQuiz = () => {
    setShowFinishModal(true);
  };

  //NOT YET DON WITH QUIZ RETURN BUTTON

  const backToQuizButton = () => {
    setShowFinishModal(false);
  };

  //QUIZ CODE POP UP
  const handleGenerateQuizCode = async () => {
    const jwtToken = localStorage.getItem("token");
    const decodedToken = jwtDecode(jwtToken);
    const decodedId = decodedToken._id;
    const newQuiz = await QuizModel.createQuiz(quizData, decodedId);
    setShowQuizCodeModal(true);
  };

  //CLOSE QUIZ CODE
  const closeQuizCode = () => {
    setShowQuizCodeModal(false);
    setShowFinishModal(false);
    localStorage.removeItem("quizData");
    navigate("/builder/dashboard");
  };

  return (
    <div>
      <BuilderQuizForm
        handleQuizTitleChange={handleQuizTitleChange}
        quizData={quizData}
        setQuizData={setQuizData}
        quizTitle={quizData.quizTitle}
        cards={quizData.questionObject}
        id={quizData._id}
        showFinishModal={showFinishModal}
        handleAddCard={handleAddCard}
        handleDeleteQuizCard={handleDeleteQuizCard}
        handleEditQuizCard={handleEditQuizCard}
        saveToLocalStorage={saveToLocalStorage}
        handleFinishQuiz={handleFinishQuiz}
        backToQuizButton={backToQuizButton}
        showQuizCodeModal={showQuizCodeModal}
        handleGenerateQuizCode={handleGenerateQuizCode}
        closeQuizCode={closeQuizCode}
        backToDashboard={backToDashboard}
      />
    </div>
  );
}
