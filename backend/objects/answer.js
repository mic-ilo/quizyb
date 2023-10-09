const AnswerModel = require("../models/answer.entity");
const QuizModel = require("../models/quiz.entity");
const { v4: uuidv4 } = require("uuid");
class Answer {
  constructor() {}

  async inputReferenceCode(quizId) {
    try {
      const quiz = await QuizModel.findOne({ _id: quizId });

      if (!quiz) {
        throw new Error("Quiz not found");
      }

      return {
        quizId: quiz._id,
        title: quiz.quizTitle,
        questions: quiz.questionObject,
      };
    } catch (error) {
      console.error("Error getting questions by reference code:", error);
      throw error;
    }}

    async submitAnswer(quizId, quizResults) {
      try {
        const quiz = await QuizModel.findOne({ _id: quizId });

        if (!quiz) {
          throw new Error("Quiz not found");
        }

        const answer = new AnswerModel({
          _id: uuidv4(),
          quizId: quizId,
          user: {
            userId: quizResults.user.userId,
            username: quizResults.user.username,
          },
          totalScore: quizResults.totalScore,
        });

        console.log("Reached here")

        await answer.save();
      } catch (error) {
        console.error("Error submitting answer:", error);
        throw error;
      }
    }
  }


module.exports = Answer;
