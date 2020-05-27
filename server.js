const express = require("express");
const session = require("express-session")
const cors = require("cors")
const routes = require("./routes");
const moment = require("moment")
const cookieSession =  require("cookie-session")
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


// let sessionStore = new MySQLStore(db);


// initializing passport
app.use(passport.initialize());
app.use(passport.session());

app.use(session({  secret:[keys.session.cookieKey], resave: false, saveUninitialized: false
  // , store:sessionStore 
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

    let userclass = [

      {role:"student", ClassId:8, UserId:2},
      {role:"student", ClassId:9, UserId:2},
  
    ]
    // userclass.forEach(item => {
    //   db.UserClass.create(item)
    //     .then(() =>{
    //       console.log("userclass table seeded")
    //   })
      
    // })  
    // =============
  })
})

