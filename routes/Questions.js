const express = require("express");
const { validateToken } = require("../middlewares/AuthMiddleware");
const router = express.Router();
const { Questions, Options } = require("../models");

// Create Question
router.post("/createQuestion", async (req, res) => {
  try {
    var newQuestion = [];
    var newOption = [];
    await Promise.all(
      req.body.map(async (data, index) => {
        const { question, QuizeId, options, awnser, description } = data;
        console.log("data", data);
        const optionsVal = options.join(",.,");
        newQuestion.push(await Questions.create({ question, QuizeId }));
        newOption.push(
          await Options.create({
            options: optionsVal,
            awnser,
            description,
            QuestionId: newQuestion[index].id,
            QuizeId,
          })
        );
      })
    );
    res.json({ success: true, data: { newOption, newQuestion } });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

// Get all Question of specific quiz
router.get("/getAllQuestions", async (req, res) => {
  const { QuizeId } = req.query;
  const newQuiz = await Questions.findAll({
    where: { QuizeId },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [Options],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  res.json({ success: true, data: newQuiz });
});

// Get all Options of specific question
router.get("/getAllOptions", async (req, res) => {
  const { QuestionId } = req.query;
  const newOption = await Options.findAll({
    where: { QuestionId },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  res.json({ success: true, data: newOption });
});

module.exports = router;
