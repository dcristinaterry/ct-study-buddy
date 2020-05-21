const express = require("express");
const session = require("express-session")
// const routes = require("./routes");
const moment = require("moment")
const passport = require("./config/passport");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models")

// Define middleware here
app.configure(function() {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  // app.use(session({ secret: "buddy", resave: true, saveUninitialized: true }));
  app.use(express.session({ secret: 'buddy' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});
// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "development") {
//   app.use(express.static("client/build"));
// }
// Add routes, both API and view
// app.use(routes);


db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  })
})