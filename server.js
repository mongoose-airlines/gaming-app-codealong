const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");

// load the env vars
require("dotenv").config();

// create the Express app
const app = express();

// connect to the MongoDB with mongoose
require("./config/database");
require("./config/passport");

// require our routes
const indexRouter = require("./routes/index");
const gamesRouter = require("./routes/games");
const reviewsRouter = require("./routes/reviews");
const usersRouter = require("./routes/users");
const messagesRouter = require("./routes/messages");
const authRouter = require("./routes/auth")

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// mount all routes with appropriate base paths
app.use("/", indexRouter);
app.use("/games", gamesRouter);
app.use("/", reviewsRouter);
app.use("/users", usersRouter);
app.use("/messages", messagesRouter);
app.use("/auth", authRouter)

// invalid request, send 404 page
app.use(function (req, res) {
  res.status(404).send("Cant find that!");
});

module.exports = app;
