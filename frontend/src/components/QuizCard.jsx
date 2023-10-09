import React, { useState } from 'react';
import deleteIcon from '../assets/delete.png';
import editIcon from '../assets/edit.png';

//QUIZ CARD = QUESTION CARD
const QuizCard = ({
  id,
  question,
  wrongOptions,
  correctAnswer,
  handleDeleteQuizCard,
  handleEditQuizCard,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question);
  const [editedWrongOptions, setEditedWrongOptions] = useState(wrongOptions);
  const [editedCorrectAnswer, setEditedCorrectAnswer] = useState(correctAnswer);

  const handleDeleteClick = () => {
    handleDeleteQuizCard(id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    handleEditQuizCard(id, editedQuestion, editedWrongOptions, editedCorrectAnswer);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedQuestion(question);
    setEditedWrongOptions(wrongOptions);
    setEditedCorrectAnswer(correctAnswer);
  };

  return (
    <div className='card'>
      {isEditing ? (
        <>
          <div className="form-group-quiz" id="form-question">
            <label>Question:</label>
            <input
              type="text"
              name="question"
              value={editedQuestion}
              onChange={(e) => setEditedQuestion(e.target.value)}
            />
          </div>
          {/* Individual input fields for wrong options */}
          {editedWrongOptions.map((option, index) => (
            <div className="form-group-quiz" key={index} id={`form-wrong-option-${index}`}>
              <label>Wrong Option {index + 1}:</label>
              <input
                type="text"
                name={`wrongOption${index}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...editedWrongOptions];
                  newOptions[index] = e.target.value;
                  setEditedWrongOptions(newOptions);
                }}
              />
            </div>
          ))}
          <div className="form-group-quiz" id="form-correct-answer">
            <label>Correct Answer:</label>
            <input
              type="text"
              name="correctAnswer"
              value={editedCorrectAnswer}
              onChange={(e) => setEditedCorrectAnswer(e.target.value)}
            />
          </div>
          <div className='card-icons'>
            <button className='save' onClick={handleSaveClick}>
              Save
            </button>
            <button className='cancel' onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{ fontWeight: 'bold' }}>
            {question}
          </div>
            
          <div>
            <strong>Wrong Options:</strong>
            <ul>
              {wrongOptions.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Correct Answer:</strong> {correctAnswer}
          </div>
          <div className='card-icons'>
            <img
              src={editIcon}
              alt='Edit'
              className='edit-icon'
              onClick={handleEditClick}
            />
            <img
              src={deleteIcon}
              alt='Delete'
              className='delete-icon'
              onClick={handleDeleteClick}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default QuizCard;
