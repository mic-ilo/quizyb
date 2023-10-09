const express = require("express");
const router = express.Router();
const Answer = require("../objects/answer");

router.get("/:quizId", async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const answer = new Answer();

    const quizData = await answer.inputReferenceCode(quizId);

    res.status(200).json(quizData);
  } catch (error) {
    console.error("Error getting questions by quizId:", error);
    res.status(404).json({ error: "Quiz not found" });
  }
});

router.post("/:quizId", async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const answer = new Answer();
    const quizResults = req.body;

    const quizData = await answer.submitAnswer(quizId, quizResults);

    res.status(200).json(quizData);
  } catch (error) {
    console.error("Error getting questions by quizId:", error);
    res.status(404).json({ error: "Quiz not found" });
  }
});

module.exports = router;