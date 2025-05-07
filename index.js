require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { connectToDB, sequelize } = require("./db");
const userRouter = require("./src/routes/user");
const globalErorHanler = require("./src/middlewares/global_error_handler");

connectToDB();

// sequelize.sync({force : true});
sequelize.sync();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use(globalErorHanler);

module.exports = app;
