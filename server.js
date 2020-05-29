const express = require("express");
const session = require("express-session")
const cors = require("cors")
const routes = require("./routes");
const moment = require("moment")
const cookieSession = require("cookie-session")
const cookieParser = require("cookie-parser")
const MySQLStore = require("express-mysql-session")(session);

const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models")
const url = "http://localhost:3000/"

const keys = require("./config/keys")
const passport = require("./config/passport");

var options = {
  host: process.env.DB_HOST,

}

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./sb-client/public'));

// setting up cookies
app.use(cookieSession({
  maxAge: 24*6060*60*1000,
  keys: [keys.session.cookieKey]
}))

// let sessionStore = new MySQLStore(db);
// initializing passport
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  secret: [keys.session.cookieKey], resave: true, saveUninitialized: true,
  // // , store:sessionStore ,
  // cookie: { maxAge: 24 * 6060 * 60 * 1000 }
}));

app.use(cookieParser());
// app.use(express.bodyParser());
// app.use(cors({origin:[url], credentials: true}))
// app.use(session({ secret: "buddy", resave: true, saveUninitialized: true , cookie:{maxAge:7200000}}));
// app.use(session({ secret: 'buddy' }));


app.use(routes);

// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "development") {
//   app.use(express.static("client/build"));
// }
// Add routes, both API and view
// app.use(routes);


db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    // ===============
 


    // let locationtable = [
    //   { building: 'Virtual', utilities: 'No'},
    //   { building: 'Bartle Library', room: 202, maxOccupancy: 10, utilities: 'No'},
    //   { building: 'Bartle Library', room: 310, maxOccupancy: 8, utilities: 'No'},
    //   { building: 'Bartle Library', room: 221, maxOccupancy: 20, utilities: 'No'},
    //   { building: 'Eisnehower Hall', room: 165, maxOccupancy: 20, utilities: 'No'},
    //   { building: 'Eisnehower Hall', room: 167, maxOccupancy: 20, utilities: 'No'},
    //   { building: 'Eisnehower Hall', room: 169, maxOccupancy: 20, utilities: 'No'},
    //   { building: 'Science Library', room: 335, maxOccupancy: 12, utilities: 'Yes'},
    //   { building: 'Science Library', room: 337, maxOccupancy: 10, utilities: 'Yes'},
    //   { building: 'Science Library', room: 339, maxOccupancy: 12, utilities: 'Yes'},
    //   { building: 'Engineering', room: 312, maxOccupancy: 8, utilities: 'Yes'},
    //   { building: 'Engineering', room: 314, maxOccupancy: 16, utilities: 'Yes'},
    //   { building: 'Engineering', room: 316, maxOccupancy: 10, utilities: 'Yes'}
    // ]
    // locationtable.forEach(item => {
    //   db.Location.create(item)
    //     .then(() =>
    //       console.log("locations table seeded"))
    //     .catch(error => console.log(error));
    // });

    // let sessiondata = [
    //   { subject: 'bioExam1', sessionDate: '2020-06-27 05:39:34', maxPartipants:3, LocationId:3, ClassId:1, hostId:4},
    //   { subject: 'midterm', sessionDate: '2020-05-30 05:39:34', maxPartipants:3,LocationId:3, ClassId:4, hostId:4},
    //   { subject: 'midterm1', sessionDate: '2020-06-02 05:39:34',maxPartipants:3, LocationId:3, ClassId:2, hostId:5},
    //   { subject: 'midterm2', sessionDate: '2020-06-02 05:39:34', maxPartipants:3,LocationId:3, ClassId:3, hostId:7},
    //   { subject: 'midterm3', sessionDate: '2020-06-02 05:39:34', maxPartipants:3,LocationId:3, ClassId:4, hostId:7}   
    // ]
    // sessiondata.forEach(item => {
    //   db.Session.create(item)
    //     .then(() =>
    //       console.log("session table seeded"))
    //     .catch(error => console.log(error));
    // });
    // =============
  })
})

