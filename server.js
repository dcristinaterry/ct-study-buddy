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
//   app.use(express.static("sb-client/build"));
// }
// Add routes, both API and view
// app.use(express.static('sb-client/public'));
if (process.env.NODE_ENV === "production") {
  app.use(express.static('sb-client/build'))
  }


db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    // ===============
    // let sessiondata = [
    //   { subject: 'Midterm1', sessionDate: '2020-06-04 15:30:34', maxParticipants:10, LocationId:4, ClassId:9, hostId:2},
    //   { subject: 'Midterm2', sessionDate: '2020-06-21 13:30:34', maxParticipants:10, LocationId:6,ClassId:1, hostId:15},
    //   { subject: 'Midterm2', sessionDate: '2020-06-21 17:00:34', maxParticipants:8, LocationId:1, ClassId:15, hostId:5},
    //   { subject: 'Midterm3', sessionDate: '2020-07-28 18:00:34', maxParticipants:10, LocationId:2, ClassId:29, hostId:7},
    //   { subject: 'Midterm1', sessionDate: '2020-06-03 19:00:34', maxParticipants:8, LocationId:6, ClassId:13, hostId:17},
    //   { subject: 'Midterm1', sessionDate: '2020-06-06 20:00:34', maxParticipants:6, LocationId:7, ClassId:9, hostId:8},
    //   { subject: 'Midterm2', sessionDate: '2020-06-28 17:30:34', maxParticipants:10, LocationId:8, ClassId:16, hostId:2},
    //   { subject: 'Midterm1', sessionDate: '2020-06-05 14:00:34', maxParticipants:10, LocationId:10, ClassId:27, hostId:9},
    //   { subject: 'Midterm2', sessionDate: '2020-06-27 15:30:34', maxParticipants:8, LocationId:3, ClassId:33, hostId:22},
    //   { subject: 'Midterm3', sessionDate: '2020-07-29 17:30:34', maxParticipants:6, LocationId:3, ClassId:34, hostId:18},
    //   { subject: 'Midterm1', sessionDate: '2020-06-06 22:30:34', maxParticipants:8, LocationId:1, ClassId:29, hostId:8},
    //   { subject: 'Supply/Demand', sessionDate: '2020-07-04 22:30:34', maxParticipants:10, LocationId:2, ClassId:33, hostId:20}
    //   ]
    // sessiondata.forEach(item => {
    //   db.Session.create(item)
    //     .then(() =>
    //     console.log("session table seeded"))
    //     .catch(error => console.log(error));
    // });
  //  let userclass = [ 
  //   {role:"student", ClassId:1, UserId:8},
  //   {role:"student", ClassId:9, UserId:8},
  //   {role:"student", ClassId:15, UserId:8},
  //   {role:"student", ClassId:29, UserId:8},
  //   {role:"student", ClassId:1, UserId:11},
  //   {role:"student", ClassId:9, UserId:11},
  //   {role:"student", ClassId:14, UserId:11},
  //   {role:"student", ClassId:29, UserId:11},
  //   {role:"student", ClassId:1, UserId:15},
  //   {role:"student", ClassId:29, UserId:15},
  //   {role:"student", ClassId:42, UserId:15},
  //   {role:"student", ClassId:74, UserId:15},
  //   {role:"student", ClassId:9, UserId:20},
  //   {role:"student", ClassId:14, UserId:20},
  //   {role:"student", ClassId:29, UserId:20},
  //   {role:"student", ClassId:33, UserId:20}
  //   {role:"student", ClassId:1, UserId:12},
  //   {role:"student", ClassId:9, UserId:12},
  //   {role:"student", ClassId:14, UserId:12},
  //   {role:"student", ClassId:29, UserId:12},
  //   {role:"student", ClassId:1, UserId:16},
  //   {role:"student", ClassId:29, UserId:16},
  //   {role:"student", ClassId:42, UserId:16},
  //   {role:"student", ClassId:74, UserId:16},
  //   {role:"student", ClassId:9, UserId:21},
  //   {role:"student", ClassId:14, UserId:21},
  //   {role:"student", ClassId:29, UserId:21},
  //   {role:"student", ClassId:33, UserId:21}
  // ]
  // userclass.forEach(item => {
  //   db.UserClass.create(item)
  //     .then(() => {
  //       console.log("userclass table seeded")
  //     })
  //   })

  })
})

