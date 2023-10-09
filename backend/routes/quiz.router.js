const express = require("express");
const router = express.Router();
const Quiz = require("../objects/quiz");

router.post("/:builderUserId", async (req, res) => {
  try {
    const builderUserId = req.params.builderUserId;
    const quiz = new Quiz();

    const title = req.body.quizTitle;
    const newQquestions = req.body.questionObject;
    await quiz.setQuestionTitle(title);
    const id = req.body._id;
    await quiz.setId(id)
    const result = await quiz.setQuestions(
      builderUserId,
      newQquestions
    );

    res.status(201).json({ message: result });
  } catch (error) {
    console.error("Error creating quiz or questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
