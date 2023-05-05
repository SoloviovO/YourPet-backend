const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/auth");
const noticesRouter = require("./routes/notices/notices");
const { errorHandlingMiddleware } = require("./middlewares");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", userRouter);
app.use("/api/notices", noticesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandlingMiddleware);

module.exports = app;
