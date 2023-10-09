const mongoose = require("mongoose");
//1. Creating schema

const schema = new mongoose.Schema({
  userId: String, //builder
  _id: String,
  quizTitle: String,
  questionObject: [
    {
      _id: String,
      question: String,
      wrongOptions: [String, String, String],
      correctAnswer: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

//2. connect to a specific collect
const QuizModel = mongoose.model("quizzes", schema);

//3. export model so it can be used

module.exports = QuizModel;
