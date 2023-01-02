let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const usersRouter = require("./routes/users");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./routes/admin");

let PORT = 3008;

let app = express();


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);

app.use("/", usersRouter);
app.use("/api/user", usersRouter);
app.use("/api/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.render("error");
});

mongoose.connect(
  "mongodb://localhost:27017/incubation",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) console.log("connected");
    else console.log(err);
  }
);

app.listen(PORT);

module.exports = app;
