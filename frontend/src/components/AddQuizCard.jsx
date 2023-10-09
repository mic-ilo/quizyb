import React, { useState } from 'react';
import addIcon from '../assets/add.png';

//ADDING QUIZ CARD COMPONENT - I PLACED THE LIST STATE TRUE FOR THE DEFAULT VIEW YOU REQUESTED
const AddQuizCard = ({ handleAddQuizCard }) => {
  const [listOpen, setListOpen] = useState(true);
  const [question, setQuestion] = useState('');
  const [wrongOptions, setWrongOptions] = useState(['', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleAddCard = () => {
    if (question.trim() !== '' && wrongOptions.every(option => option.trim() !== '') && correctAnswer.trim() !== '') {
      handleAddQuizCard(question, wrongOptions, correctAnswer);
      setQuestion('');
      setWrongOptions(['', '', '']);
      setCorrectAnswer('');
      setListOpen(true);
    }
  };

  return (
    <div className='add-card'>
      <img
        src={addIcon}
        alt='Add'
        style={{ cursor: 'pointer' }}
        className='add-icon'
        onClick={() => setListOpen(!listOpen)}
      />
      {listOpen && (
        <div className='card-entry'>
          <div className="form-group" id="form-question">
            <label>Question:</label>
            <input
              type="text"
              name="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="form-group" id="form-options">
            <label>Wrong Options:</label>
            {wrongOptions.map((option, index) => (
              <input
                key={index}
                type="text"
                name={`wrongOption${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...wrongOptions];
                  newOptions[index] = e.target.value;
                  setWrongOptions(newOptions);
                }}
              />
            ))}
          </div>
          <div className="form-group" id="form-answer">
            <label>Correct Answer:</label>
            <input
              type="text"
              name="correctAnswer"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
          </div>
          <button className='add-button' onClick={handleAddCard}>
            Add Question
          </button>
        </div>
      )}
    </div>
  );
};

export default AddQuizCard;
