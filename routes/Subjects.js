const express = require("express");
const { validateToken } = require("../middlewares/AuthMiddleware");
const router = express.Router();
const { Courses, Quizes, Subjects } = require("../models");

// Create Course
router.post("/createSubject", async (req, res) => {
  const { subjectName, description, imageUrl, CourseId } = req.body;
  console.log("testing", subjectName, description, imageUrl, CourseId);
  const newSubject = await Subjects.create({
    CourseId,
    subjectName,
    description,
    imageUrl: "https://i.stack.imgur.com/y9DpT.jpg",
  });
  res.json({ success: true, data: newSubject });
});

// Get all courses
router.get("/getAllSubjects/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  const newSubject = await Subjects.findAll({
    where: { CourseId: courseId },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  res.json({ success: true, data: newSubject });
});

// Get Single Course
router.get("/getSingleSubject/:subjectId", async (req, res) => {
  const subjectId = req.params.subjectId;
  console.log("testin", subjectId);
  const newSubject = await Subjects.findOne({
    where: { id: subjectId },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [Quizes],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  res.json({ success: true, data: newSubject });
});

router.delete("/:subjectId", async (req, res) => {
  const subjectId = req.params.subjectId;
  await Subjects.destroy({
    where: {
      id: subjectId,
    },
  });

  res.json({ success: true, message: "DELETED SUCCESSFULLY" });
});

module.exports = router;
