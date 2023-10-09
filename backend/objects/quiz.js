const QuizModel = require("../models/quiz.entity");

class Quiz {
  constructor() {
    this.quizTitle = "";
    this._id = "";
  }
  async setQuestionTitle(title) {
    try {
      this.quizTitle = title;
    } catch (error) {}
  }
  async setId(id) {
    try {
      this._id = id;
    } catch (error) {}
  }
  async setQuestions(builderUserId, questionObject) {
    try {
      const questionObjects = questionObject.map((question) => {
        return {
          question: question.question,
          wrongOptions: question.wrongOptions,
          correctAnswer: question.correctAnswer,
        };
      });

      const newQuiz = new QuizModel({
        userId: builderUserId,
        _id: this._id,
        quizTitle: this.quizTitle,
        questionObject: questionObjects,
      });

      await newQuiz.save();
      return "Questions saved successfully.";
    } catch (err) {
      console.error("Error setting questions:", err);
    }
  }
}
module.exports = Quiz;
