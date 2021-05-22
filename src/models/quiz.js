const mongoose = require('../config/database');

const QuizSchema = new mongoose.Schema({
  question: {
    type: String,
    require: true,
  },
  answers: {
    type: Array,
    require: true,
  },
  rightAnswer: {
    type: String,
    require: true,
  },
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;
