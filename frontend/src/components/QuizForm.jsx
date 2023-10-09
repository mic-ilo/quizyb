import React from 'react';
import QuizCard from './QuizCard';

// IMPORTANT NOTE TO MICH & PJ: PLEASE CHECK THE QUIZ TITLE HERE. I REMOVED TEMPORARILY DUE UI ERROR

const QuizForm = ({ quizTitle, cards, handleDeleteQuizCard, handleEditQuizCard }) => {
  return (
    <div className='quiz-form'>
      {/* <div classname = "new-quiz-title"> {quizTitle}</div> */}
      {/* ABOVE IS MY PROBLEM FOR THE GAP ON LEFT, BELOW MY PROBLEM IS REVERSED ADDING / */}
      {cards.map((card) => (
        <QuizCard
          key={card.id}
          id={card.id}
          question={card.question}
          wrongOptions={card.wrongOptions}
          correctAnswer={card.correctAnswer}
          handleDeleteQuizCard={handleDeleteQuizCard}
          handleEditQuizCard={handleEditQuizCard}
        />
      ))}
    </div>
  );
};

export default QuizForm;
