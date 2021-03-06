// ?info: app level imports 
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// ?info: monopoly related configuration, like routing and api masthead
const masthead = require("./public/javascripts/masthead");
const usersRouter = require('./routes/users')
const  moveRouter = require('./routes/move')
const  gameRouter = require('./routes/game')

/*// ?info: db related operations needed to reset db, and initialize libraries needed to spin up docker instance.
  //?       this functionality is dev only  
*/
const { initdb, drop } = require('./db/server');

var app = express();

// ?info: app configuration
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/game", gameRouter);
app.use("/move", moveRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

console.log(masthead);
drop();
initdb();
console.log(`
 this api generally takes and updates user session info for monopoly game clients
 visit the api at https://localhost:3000/
`);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
