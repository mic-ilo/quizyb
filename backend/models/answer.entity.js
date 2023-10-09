const mongoose = require('mongoose')

//1. Creating schema

const schema = new mongoose.Schema({
    _id: String,
    quizId: String,
    user: {
        userId: String,
        username: String
    },
    totalScore: Number
  });

//2. connect to a specific collect
const AnswerModel = mongoose.model('answers', schema)

//3. export model so it can be used

module.exports = AnswerModel;