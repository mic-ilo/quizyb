import { useEffect } from "react";
import QuizForm from "../components/QuizForm";
import AddQuizCard from "../components/AddQuizCard";
import SidebarGuide from "../components/SidebarGuide";
import "../styles/builderquizform.css";


// FOR SINGLE QUIZDATA PUSH TO LOCAL STORAGE
const BuilderQuizForm = (props) => {
  const {
    handleQuizTitleChange,
    quizData,
    setQuizData,
    quizTitle,
    cards,
    id,
    showFinishModal,
    handleAddCard,
    handleDeleteQuizCard,
    handleEditQuizCard,
    saveToLocalStorage,
    handleFinishQuiz,
    backToQuizButton,
    showQuizCodeModal,
    handleGenerateQuizCode,
    closeQuizCode,
    backToDashboard

  } = props;

  //LOCAL STORAGE SAVING
  useEffect(() => {
    const storedQuizData = localStorage.getItem("quizData");
    if (storedQuizData) {
      {
        setQuizData(JSON.parse(storedQuizData));
      }
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage(quizData);
  }, [quizData]);

  return (
    <div className="builderquizform-container">
      
      <div className="grid-container">
        
        <SidebarGuide backToDashboard={backToDashboard}/>
        
        <div className= "quiz-template">
          <div className="new-quiz-title">{quizTitle}</div>
          <div className="quiz-title-field">
         
            
            <input
              type="text"
              placeholder="Enter Your Quiz Title Here"
              value={quizTitle}
              onChange={handleQuizTitleChange}
            />
          </div>
          
          <div className="add-card">
            <AddQuizCard handleAddQuizCard={handleAddCard} />
          </div>
          <div className="existing-cards">
            <QuizForm
              quizTitle={quizTitle}
              cards={cards}
              handleDeleteQuizCard={handleDeleteQuizCard}
              handleEditQuizCard={handleEditQuizCard}
            />
          </div>
          
          <button className="finish-quiz-button" onClick={handleFinishQuiz}>
            Quiz Done
          </button>



          {showFinishModal && (
            <div className="modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h2> Hive you completed your quiz? </h2>
                </div>
                <div className="modal-buttons">
                  <button className="primary" onClick={handleGenerateQuizCode}>
                    Done! Buzz me my quiz code!
                  </button>
                  <button className="secondary" onClick={backToQuizButton}>
                    Nope! Take me back, bee-patient.
                  </button>
                </div>
              </div>
            </div>
          )}

          {showQuizCodeModal && (
            <div className="modal"> 
              <div className="modal-content">
                <div className="modal-header-quizform">
                  <h2>Buzztastic! 🎉 <br/> Your quiz is now ready. </h2>
                </div>
                <div className="modal-text-quizform">
                  Copy your code, share to your player bees, <br/> and let the quizzing begin!
                </div>
                <div className="quiz-code">{id}</div>
                <div className="modal-buttons">
                  
                  <div className="button-container">
                    <button className="quiz-code-button" onClick={closeQuizCode}>
                      I got the code. Buzz me out!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderQuizForm;
