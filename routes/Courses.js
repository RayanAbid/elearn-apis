const express = require("express");
const { validateToken } = require("../middlewares/AuthMiddleware");
const router = express.Router();
const { Courses, Quizes, Subjects } = require("../models");

// Create Course
router.post("/createCourse", async (req, res) => {
  const { courseName, description, imageUrl } = req.body;
  console.log("testing", courseName, description);
  const newCourse = await Courses.create({
    courseName,
    description,
    imageUrl: "https://i.stack.imgur.com/y9DpT.jpg",
  });
  res.json({ success: true, data: newCourse });
});

// Edit Course
router.post("/editCourse", async (req, res) => {
  const { courseName, description, imageUrl, courseId } = req.body;
  console.log("testing", courseName, description);
  const course = await Courses.update(
    {
      courseName,
      description,
      imageUrl: "https://i.stack.imgur.com/y9DpT.jpg",
    },
    { where: { id: courseId } }
  );

  res.json({
    success: true,
    data: {
      courseName,
      description,
      imageUrl: "https://i.stack.imgur.com/y9DpT.jpg",
    },
  });
});

// Get all courses
router.get("/getAllCourses", async (req, res) => {
  const newCourse = await Courses.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [Subjects],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  res.json({ success: true, data: newCourse });
});

// Get Single Course
router.get("/getSingleCourse/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  console.log("testin", courseId);
  const newCourse = await Courses.findOne({
    where: { id: courseId },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [Subjects],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  res.json({ success: true, data: newCourse });
});

router.delete("/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  await Courses.destroy({
    where: {
      id: courseId,
    },
  });

  res.json({ success: true, message: "DELETED SUCCESSFULLY" });
});

module.exports = router;
