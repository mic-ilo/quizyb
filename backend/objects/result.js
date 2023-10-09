const QuizModel = require("../models/quiz.entity");
const AnswerModel = require("../models/answer.entity");

class Result {
  constructor() {}
  async getQuizzesByBuilder(builderUserId) {
    try {
      const quizzes = await QuizModel.find({ userId: builderUserId }).select(
        "-userId -questionObject -createdAt -__v"
      );

      const quizzesWithPlayers = await Promise.all(
        quizzes.map(async (quiz) => {
          const players = await AnswerModel.countDocuments({
            quizId: quiz._id,
          });
          return { ...quiz.toObject(), players };
        })
      );

      return quizzesWithPlayers;
    } catch (error) {
      console.error("Error getting quizzes by builder:", error);
      throw error;
    }
  }
  async getResultsByQuiz(quizId) {
    try {
      const quiz = await QuizModel.findOne({ _id: quizId });
      if (!quiz) {
        throw new Error("Quiz not found");
      }

      const answers = await AnswerModel.find({ quizId: quizId, });

      const playersData = answers.map((answer) => {
        const { user, totalScore } = answer;
        return {
          username: user.username,
          totalScore: totalScore,
        };
      });

      return {
        quizTitle: quiz.quizTitle,
        players: playersData,
      };
    } catch (error) {
      console.error("Error retrieving results by quizId:", error);
      throw error;
    }
  }
}

module.exports = Result;
