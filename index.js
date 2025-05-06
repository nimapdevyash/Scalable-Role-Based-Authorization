require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { connectToDB } = require("./db");
const router = require("./src/routes/user");
const globalErorHanler = require("./src/middlewares/global_error_handler");

connectToDB();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", router);
app.use(globalErorHanler);

module.exports = app;
