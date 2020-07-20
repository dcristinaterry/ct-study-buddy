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
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "development") {
  app.use(express.static("sb-client/public"));
}
// Add routes, both API and view
// app.use(express.static('sb-client/public'));
if (process.env.NODE_ENV === "production") {
  app.use(express.static('sb-client/build'))
}

// setting up cookies
app.use(cookieSession({
  maxAge: 24 * 6060 * 60 * 1000,
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

app.use(routes);


db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  })
  // // // ===============
  // let sessiondata = [
  //   { subject: 'Midterm1', sessionDate: '2020-09-04 15:30:34', maxParticipants:10, LocationId:4, ClassId:9, hostId:3},
  //   { subject: 'Midterm2', sessionDate: '2020-09-21 13:30:34', maxParticipants:10, LocationId:6,ClassId:14, hostId:3},
  //   { subject: 'Midterm2', sessionDate: '2020-10-21 17:00:34', maxParticipants:8, LocationId:1, ClassId:29, hostId:3},
  //   { subject: 'Midterm3', sessionDate: '2020-11-28 18:00:34', maxParticipants:10, LocationId:2, ClassId:29, hostId:3},
  //   { subject: 'Midterm1', sessionDate: '2020-09-03 19:00:34', maxParticipants:8, LocationId:6, ClassId:9, hostId:4},
  //   { subject: 'Midterm1', sessionDate: '2020-09-06 20:00:34', maxParticipants:6, LocationId:7, ClassId:9, hostId:4},
  //   { subject: 'Midterm2', sessionDate: '2020-10-28 17:30:34', maxParticipants:10, LocationId:8, ClassId:14, hostId:4},
  //   { subject: 'Midterm1', sessionDate: '2020-09-05 14:00:34', maxParticipants:10, LocationId:10, ClassId:28, hostId:5},
  //   { subject: 'Midterm2', sessionDate: '2020-09-27 15:30:34', maxParticipants:8, LocationId:3, ClassId:80, hostId:5},
  //   ]
  // sessiondata.forEach(item => {
  //   db.Session.create(item)
  //     .then(() =>
  //     console.log("session table seeded"))
  //     .catch(error => console.log(error));
  // });

  //  let userclass = [

  //   {role:"student", ClassId:1, UserId:3},
  //   {role:"student", ClassId:9, UserId:3},
  //   {role:"student", ClassId:14, UserId:3},
  //   {role:"student", ClassId:29, UserId:3},
  //   {role:"student", ClassId:1, UserId:3},
  //   {role:"student", ClassId:9, UserId:4},
  //   {role:"student", ClassId:14, UserId:4},
  //   {role:"student", ClassId:29, UserId:4},
  //   {role:"student", ClassId:1, UserId:4},
  //   {role:"student", ClassId:9, UserId:5},
  //   {role:"student", ClassId:14, UserId:5},
  //   {role:"student", ClassId:28, UserId:5},
  //   {role:"student", ClassId:34, UserId:5},
  //   {role:"student", ClassId:2, UserId:5},
  //   {role:"student", ClassId:80, UserId:5},
  // ]
  // userclass.forEach(item => {
  //   db.UserClass.create(item)
  //     .then(() => {
  //       console.log("userclass table seeded")
  //     })
  //   })

  // let sessionUser = [
  //   {SessionId:"11", UserId:"8"},
  //   {SessionId:"11", UserId:"7"},
  //   {SessionId:"11", UserId:"17"},
  //   {SessionId:"2", UserId:"8"},
  //   {SessionId:"2", UserId:"7"},
  //   {SessionId:"2", UserId:"17"},
  //   {SessionId:"2", UserId:"18"},
  //   {SessionId:"6", UserId:"7"},
  //   {SessionId:"6", UserId:"9"},
  //   {SessionId:"6", UserId:"17"},
  //   {SessionId:"6", UserId:"18"},
  //   {SessionId:"6", UserId:"20"}

  // ]
  // sessionUser.forEach(item => {
  //   db.UserSession.create(item)
  //     .then(() =>{
  //       console.log("userclass table seeded")
  //   })

  // let usertable = [
  //   { email: 'admin@test.edu', password: 'testing', firstName: 'Admin', lastName: 'test', role: 'admin', image: 'https://randomuser.me/api/portraits/women/17.jpg' },
  //   { email: 'ta@test.edu', password: 'testing', firstName: 'Ana', lastName: 'Terry', role: 'admin', image: 'https://randomuser.me/api/portraits/women/10.jpg' },
  //   { email: 'usera@test.edu', password: 'testing', firstName: 'Brad', lastName: 'Davis', role: 'student', image: 'https://randomuser.me/api/portraits/men/36.jpg' },
  //   { email: 'userb@test.edu', password: 'testing', firstName: 'Talitha', lastName: 'Johnson', role: 'student', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
  //   { email: 'userc@test.edu', password: 'testing', firstName: 'Jad', lastName: 'Heath', role: 'student', image: 'https://randomuser.me/api/portraits/men/35.jpg' },
  // ]

  // usertable.forEach(item => {
  //   db.User.create(item)
  //     .then(() =>
  //       console.log("user table seeded"))
  //     .catch(error => console.log(error));
  // });


  // let classtable = [
  //   { subject: 'Accounting', class: '101', instructor: 'Leilani Macfarlane', ta: 'Samuel Sharma' },
  //   { subject: 'Accounting', class: '201', instructor: 'Amos Maguire', ta: 'Leja Cardenas' },
  //   { subject: 'Accounting', class: '302', instructor: 'Leilani Macfarlane', ta: 'Liam French' },
  //   { subject: 'Accounting', class: '402', instructor: 'Amos Maguire', ta: 'Tania Huynh' },
  //   { subject: 'Art History', class: '101', instructor: 'Kris Cantu', ta: 'Aj Truong' },
  //   { subject: 'Art History', class: '201', instructor: 'Sonia Miranda', ta: 'Alayna Davey' },
  //   { subject: 'Art History', class: '302', instructor: 'Kris Cantu', ta: 'Lawson Carver' },
  //   { subject: 'Art History', class: '402', instructor: 'Sonia Miranda', ta: 'Sonya Daniels' },
  //   { subject: 'Biology', class: '101', instructor: 'Alexia Butler', ta: 'Erika Ewing' },
  //   { subject: 'Biology', class: '201', instructor: 'Adaline Quinn', ta: 'Macauley Calderon' },
  //   { subject: 'Biology', class: '302', instructor: 'Alexia Butler', ta: 'Kit Parrish' },
  //   { subject: 'Biology', class: '402', instructor: 'Adaline Quinn', ta: 'Phoenix Fleming' },
  //   { subject: 'Chemistry', class: '101', instructor: 'Roksana Rutledge', ta: 'Mekhi Strong' },
  //   { subject: 'Chemistry', class: '201', instructor: 'Trent Adams', ta: 'Stefania Romero' },
  //   { subject: 'Chemistry', class: '302', instructor: 'Roksana Rutledge', ta: 'Aarron Huber' },
  //   { subject: 'Chemistry', class: '402', instructor: 'Trent Adams', ta: 'Rudi Irwin' },
  //   { subject: 'Computer Science', class: '101', instructor: 'Macauley Kim', ta: 'Rima Hull' },
  //   { subject: 'Computer Science', class: '201', instructor: 'Haley Hussain', ta: 'Derren Beattie' },
  //   { subject: 'Computer Science', class: '302', instructor: 'Macauley Kim', ta: 'Nawal Emerson' },
  //   { subject: 'Computer Science', class: '402', instructor: 'Haley Hussain', ta: 'Chantelle Glass' },
  //   { subject: 'Economics', class: '101', instructor: 'Susannah Owens', ta: 'Melissa Downes' },
  //   { subject: 'Economics', class: '201', instructor: 'Pascal Kelly', ta: 'Taine Soto' },
  //   { subject: 'Economics', class: '302', instructor: 'Susannah Owens', ta: 'Mali Mcguire' },
  //   { subject: 'Economics', class: '402', instructor: 'Pascal Kelly', ta: 'Cade Forbes' },
  //   { subject: 'Electrical Engineering', class: '101', instructor: 'Frances Glover', ta: 'Blythe Vo' },
  //   { subject: 'Electrical Engineering', class: '201', instructor: 'Kyal Woodley', ta: 'Adina Sanders' },
  //   { subject: 'Electrical Engineering', class: '302', instructor: 'Frances Glover', ta: 'Marisa Mason' },
  //   { subject: 'Electrical Engineering', class: '402', instructor: 'Kyal Woodley', ta: 'Humera Broughton' },
  //   { subject: 'English', class: '101', instructor: 'Charley Bautista', ta: 'Avleen Hansen' },
  //   { subject: 'English', class: '201', instructor: 'Aarron Petty', ta: 'Ava-May Edwards' },
  //   { subject: 'English', class: '302', instructor: 'Charley Bautista', ta: 'Hakeem Dickerson' },
  //   { subject: 'English', class: '402', instructor: 'Aarron Petty', ta: 'Jamelia Garrett' },
  //   { subject: 'Finance', class: '101', instructor: 'Dalton Trejo', ta: 'Aahil Larsen' },
  //   { subject: 'Finance', class: '201', instructor: 'Elinor Daugherty', ta: 'Haleema Nash' },
  //   { subject: 'Finance', class: '302', instructor: 'Dalton Trejo', ta: 'Desiree Holloway' },
  //   { subject: 'Finance', class: '402', instructor: 'Elinor Daugherty', ta: 'Kane Conway' },
  //   { subject: 'French', class: '101', instructor: 'Marguerite Zamora', ta: 'Mathias Boone' },
  //   { subject: 'French', class: '201', instructor: 'Timur Hackett', ta: 'Khushi Handley' },
  //   { subject: 'French', class: '302', instructor: 'Marguerite Zamora', ta: 'Bryony Vargas' },
  //   { subject: 'French', class: '402', instructor: 'Timur Hackett', ta: 'Darren Archer' },
  //   { subject: 'Full Stack', class: '101', instructor: 'Jerome Chenette', ta: 'Kerwin Hy, Mahi Gunasekaran' },
  //   { subject: 'History', class: '101', instructor: 'Brielle Willis', ta: 'Eduardo Rodriguez' },
  //   { subject: 'History', class: '201', instructor: 'Nabeel Handley', ta: 'Michalina Olson' },
  //   { subject: 'History', class: '302', instructor: 'Brielle Willis', ta: 'Tyler-James Sanchez' },
  //   { subject: 'History', class: '402', instructor: 'Nabeel Handley', ta: 'Malikah Mckenna' },
  //   { subject: 'Italian', class: '101', instructor: 'Keith Pruitt', ta: 'Markus Whitehouse' },
  //   { subject: 'Italian', class: '201', instructor: 'Leland Cummings', ta: 'Harriette Mayo' },
  //   { subject: 'Italian', class: '302', instructor: 'Keith Pruitt', ta: 'Macie Kaye' },
  //   { subject: 'Italian', class: '402', instructor: 'Leland Cummings', ta: 'Mabel Moody' },
  //   { subject: 'Management', class: '101', instructor: 'Kester Chen', ta: 'Cecilia Randall' },
  //   { subject: 'Management', class: '201', instructor: 'Awais Amin', ta: 'Nel Wright' },
  //   { subject: 'Management', class: '302', instructor: 'Kester Chen', ta: 'Caris Palmer' },
  //   { subject: 'Management', class: '402', instructor: 'Awais Amin', ta: 'Sila Velez' },
  //   { subject: 'Mathematics', class: '101', instructor: 'Jade Hussain', ta: 'Daisy-Mae Piper' },
  //   { subject: 'Mathematics', class: '201', instructor: 'Jay-Jay Weber', ta: 'Asif Jordan' },
  //   { subject: 'Mathematics', class: '302', instructor: 'Jade Hussain', ta: 'Cienna Rahman' },
  //   { subject: 'Mathematics', class: '402', instructor: 'Jay-Jay Weber', ta: 'Sayed Franklin' },
  //   { subject: 'Music', class: '101', instructor: 'Kristina Lovell', ta: 'Kirstie Shields' },
  //   { subject: 'Music', class: '201', instructor: 'Tadhg Barclay', ta: 'Kobi Hensley' },
  //   { subject: 'Music', class: '302', instructor: 'Kristina Lovell', ta: 'Cally Perez' },
  //   { subject: 'Music', class: '402', instructor: 'Tadhg Barclay', ta: 'Dagwood Holland' },
  //   { subject: 'Philosophy', class: '101', instructor: 'Rosalie Mccaffrey', ta: 'Adele Elliott' },
  //   { subject: 'Philosophy', class: '201', instructor: 'Aliyah Small', ta: 'Cloe Allman' },
  //   { subject: 'Philosophy', class: '302', instructor: 'Rosalie Mccaffrey', ta: 'Amelie Dunne' },
  //   { subject: 'Philosophy', class: '402', instructor: 'Aliyah Small', ta: 'Sultan Owen' },
  //   { subject: 'Physics', class: '101', instructor: 'Mahdi Buckner', ta: 'Amit Naylor' },
  //   { subject: 'Physics', class: '201', instructor: 'Maia Waters', ta: 'Freddie Stephenson' },
  //   { subject: 'Physics', class: '302', instructor: 'Mahdi Buckner', ta: 'Havin Davie' },
  //   { subject: 'Physics', class: '402', instructor: 'Maia Waters', ta: 'Jordan Brown' },
  //   { subject: 'Political Science', class: '101', instructor: 'Malakai Connor', ta: 'Jaylan Hirst' },
  //   { subject: 'Political Science', class: '201', instructor: 'Molly Whitaker', ta: 'Arfa Plummer' },
  //   { subject: 'Political Science', class: '302', instructor: 'Malakai Connor', ta: 'Milla Hale' },
  //   { subject: 'Political Science', class: '402', instructor: 'Molly Whitaker', ta: 'Aronas Castaneda' },
  //   { subject: 'Psychology', class: '101', instructor: 'Anthony Colon', ta: 'Eliana Vickers' },
  //   { subject: 'Psychology', class: '201', instructor: 'Merlin Robson', ta: 'Daniaal Molloy' },
  //   { subject: 'Psychology', class: '302', instructor: 'Anthony Colon', ta: 'Jess Warner' },
  //   { subject: 'Psychology', class: '402', instructor: 'Merlin Robson', ta: 'Ela Prentice' },
  //   { subject: 'Spanish', class: '101', instructor: 'Vera Hastings', ta: 'Connar Shannon' },
  //   { subject: 'Spanish', class: '201', instructor: 'Shona Good', ta: 'Ricky Sanford' },
  //   { subject: 'Spanish', class: '302', instructor: 'Vera Hastings', ta: 'Dustin Reyes' },
  //   { subject: 'Spanish', class: '402', instructor: 'Shona Good', ta: 'Kajol Page' }
  // ]

  // classtable.forEach(item => {
  //   db.Class.create(item)
  //     .then(() =>
  //       console.log("class table seeded"))
  //     .catch(error => console.log(error)
  //     );
  // })



  // let locationtable = [
  //   { building: 'Bartle Library', room: 202, maxOccupancy: 10, utilities: 'No' },
  //   { building: 'Bartle Library', room: 310, maxOccupancy: 8, utilities: 'No' },
  //   { building: 'Bartle Library', room: 221, maxOccupancy: 20, utilities: 'No' },
  //   { building: 'Eisnehower Hall', room: 165, maxOccupancy: 20, utilities: 'No' },
  //   { building: 'Eisnehower Hall', room: 167, maxOccupancy: 20, utilities: 'No' },
  //   { building: 'Eisnehower Hall', room: 169, maxOccupancy: 20, utilities: 'No' },
    // { building: 'Science Library', room: 335, maxOccupancy: 12, utilities: 'Yes' },
  //   { building: 'Science Library', room: 337, maxOccupancy: 10, utilities: 'Yes' },
  //   { building: 'Science Library', room: 339, maxOccupancy: 12, utilities: 'Yes' },
  //   { building: 'Engineering', room: 312, maxOccupancy: 8, utilities: 'Yes' },
  //   { building: 'Engineering', room: 314, maxOccupancy: 16, utilities: 'Yes' },
  //   { building: 'Engineering', room: 316, maxOccupancy: 10, utilities: 'Yes' },
  //   { building: 'Virtual', maxOccupancy: 10, utilities: 'No' }
  // ]
  // locationtable.forEach(item => {
  //   db.Location.create(item)
  //     .then(() =>
  //       console.log("locations table seeded"))
  //     .catch(error => console.log(error));
  // });
})
