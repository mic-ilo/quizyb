const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const dotenv = require("dotenv");
dotenv.config();
const AuthRouter = require("./routes/auth.router");
const UserRouter = require("./routes/user.router");
const QuizRouter = require("./routes/quiz.router");
const ResultRouter = require("./routes/result.router");
const AnswerRouter = require("./routes/answer.router");
const port = process.env.PORT || 3000;
const app = express();

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(`${req.method} for ${req.url}`);

  next();
});
app.use("/auth", AuthRouter);

app.use((req, res, next) => {
  const token = req.headers.authorization;

  if (req.path !== "/user/register") {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.sendStatus(401);
    }
  }

  next();
});

app.use("/user", UserRouter);
app.use("/quiz", QuizRouter);
app.use("/result", ResultRouter);
app.use("/answer", AnswerRouter);

// Route to get the port response
app.get("/api/port", (req, res) => {
  res.json({ port });
});
app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
