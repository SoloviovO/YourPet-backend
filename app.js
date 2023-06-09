const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const noticeRouter = require("./routes/notice");
const petsRouter = require("./routes/pets");
const friendsRouter = require("./routes/friends");
const newsRouter = require("./routes/news");
const { errorHandlingMiddleware } = require("./middlewares");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notices", noticeRouter);
app.use("/api/pets", petsRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/news", newsRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandlingMiddleware);

module.exports = app;
