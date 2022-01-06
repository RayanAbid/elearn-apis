const express = require("express");
const { validateToken } = require("../middlewares/AuthMiddleware");
const router = express.Router();
const { Quizes, Questions, Options } = require("../models");

// Create Course
router.post("/createQuizes", async (req, res) => {
  const { title, quizTime, SubjectId } = req.body;
  const newQuiz = await Quizes.create({ title, quizTime, SubjectId });
  res.json({ success: true, data: newQuiz });
});

// Get all Quizes of a course
router.get("/getAllQuizes/:SubjectId", async (req, res) => {
  const { SubjectId } = req.params;
  console.log("testing", SubjectId);

  const newQuiz = await Quizes.findAll({
    where: { SubjectId },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  res.json({ success: true, data: newQuiz });
});

// get single quiz
router.get("/getSingleQuiz/:subjectId", async (req, res) => {
  const subjectId = req.params.subjectId;
  console.log("testin", subjectId);
  const newQuiz = await Quizes.findOne({
    where: { id: subjectId },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [Questions],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  res.json({ success: true, data: newQuiz });
});

// Delete quiz
router.delete("/:quizID", async (req, res) => {
  const quizID = req.params.quizID;
  await Quizes.destroy({
    where: {
      id: quizID,
    },
  });

  res.json({ success: true, message: "DELETED SUCCESSFULLY" });
});

module.exports = router;
