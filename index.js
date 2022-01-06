const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const subjectsRouter = require("./routes/Subjects");
app.use("/subjects", subjectsRouter);
const coursesRouter = require("./routes/Courses");
app.use("/courses", coursesRouter);
const quizesRouter = require("./routes/Quizes");
app.use("/quizes", quizesRouter);
const questionsRouter = require("./routes/Questions");
app.use("/questions", questionsRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server is running :D",
  });
});

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log("Server running on port 3001");
  });
});
