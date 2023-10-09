const express = require("express");
const router = express.Router();
const Result = require("../objects/result");

router.get("/:builderId/quizzes", async (req, res) => {
  try {
    const builderId = req.params.builderId;

    const result = new Result();
    const quizzesWithPlayers = await result.getQuizzesByBuilder(builderId);

    res.status(200).json(quizzesWithPlayers);
  } catch (error) {
    console.error("Error retrieving quizzes by builder:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/:quizId/players", async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const result = new Result();

    const quizResults = await result.getResultsByQuiz(quizId);

    res.status(200).json(quizResults.players);
  } catch (error) {
    console.error("Error retrieving quiz players:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;