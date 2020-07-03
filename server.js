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

app.use(routes);


db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  })
    // // ===============
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
  //   {role:"student", ClassId:14, UserId:8},
  //   {role:"student", ClassId:29, UserId:8},
  //   {role:"student", ClassId:1, UserId:7},
  //   {role:"student", ClassId:9, UserId:7},
  //   {role:"student", ClassId:14, UserId:7},
  //   {role:"student", ClassId:29, UserId:7},
  //   {role:"student", ClassId:1, UserId:9},
  //   {role:"student", ClassId:9, UserId:9},
  //   {role:"student", ClassId:14, UserId:9},
  //   {role:"student", ClassId:28, UserId:9},
  //   {role:"student", ClassId:1, UserId:17},
  //   {role:"student", ClassId:9, UserId:17},
  //   {role:"student", ClassId:13, UserId:17},
  //   {role:"student", ClassId:29, UserId:17},
  //   {role:"student", ClassId:1, UserId:18},
  //   {role:"student", ClassId:9, UserId:18},
  //   {role:"student", ClassId:14, UserId:18},
  //   {role:"student", ClassId:34, UserId:18},
  //   {role:"student", ClassId:2, UserId:20},
  //   {role:"student", ClassId:9, UserId:20},
  //   {role:"student", ClassId:14, UserId:20},
  //   {role:"student", ClassId:33, UserId:20}
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
      //   { email: 'test@test.com', password: 'testing', firstName: 'test', lastName: 'test', role: 'admin' },
      //   { email: 'cristina@cristina.com', password: 'testing', firstName: 'Cristina', lastName: 'Terry', role: 'admin', image: 'https://media-exp1.licdn.com/dms/image/C4D03AQFaxqj0rTBR-Q/profile-displayphoto-shrink_200_200/0?e=1595462400&v=beta&t=fgQsiqeK6w_r2ltU-SizUL8F4p59vE5pNpxqIyFWxTQ' },
      //   { email: 'brad@brad.com', password: 'testing', firstName: 'Brad', lastName: 'Davis', role: 'admin', image: 'https://media-exp1.licdn.com/dms/image/C5603AQFUm1pTViCp1w/profile-displayphoto-shrink_200_200/0?e=1595462400&v=beta&t=e0DfY23faeKtF9Rehlob49poE-Lr5nac5UeuHscN0uI' },
      //   { email: 'ta@ta.com', password: 'testing', firstName: 'Teaching', lastName: 'Assistant', role: 'ta' },
      //   { email: 'tjohnson@ucb.edu', password: 'testing', firstName: 'Talitha', lastName: 'Johnson', role: 'student', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
      //   { email: 'jheath@ucb.edu', password: 'testing', firstName: 'Jad', lastName: 'Heath', role: 'student', image: 'https://randomuser.me/api/portraits/men/26.jpg' },
      //   { email: 'jmejia@ucb.edu', password: 'testing', firstName: 'Jensen', lastName: 'Mejia', role: 'student', image: 'https://randomuser.me/api/portraits/men/27.jpg' },
      //   { email: 'cbell@ucb.edu', password: 'testing', firstName: 'Cynthia', lastName: 'Bell', role: 'student', image: 'https://randomuser.me/api/portraits/women/7.jpg' },
      //   { email: 'bblackwell@ucb.edu', password: 'testing', firstName: 'Braxton', lastName: 'Blackwell', role: 'student', image: 'https://randomuser.me/api/portraits/men/28.jpg' },
      //   { email: 'oforster@ucb.edu', password: 'testing', firstName: 'Olli', lastName: 'Forster', role: 'student', image: 'https://randomuser.me/api/portraits/men/29.jpg' },
      //   { email: 'vhooper@ucb.edu', password: 'testing', firstName: 'Varun', lastName: 'Hooper', role: 'student', image: 'https://randomuser.me/api/portraits/men/30.jpg' },
      //   { email: 'swoodcock@ucb.edu', password: 'testing', firstName: 'Sumayyah', lastName: 'Woodcock', role: 'student', image: 'https://randomuser.me/api/portraits/women/8.jpg' },
      //   { email: 'ngarrett@ucb.edu', password: 'testing', firstName: 'Niamh', lastName: 'Garrett', role: 'student', image: 'https://randomuser.me/api/portraits/women/9.jpg' },
      //   { email: 'halvarez@ucb.edu', password: 'testing', firstName: 'Harvey', lastName: 'Alvarez', role: 'student', image: 'https://randomuser.me/api/portraits/men/31.jpg' },
      //   { email: 'ahastings@ucb.edu', password: 'testing', firstName: 'Anne', lastName: 'Hastings', role: 'student', image: 'https://randomuser.me/api/portraits/women/10.jpg' },
      //   { email: 'ahuerta@ucb.edu', password: 'testing', firstName: 'Atlas', lastName: 'Huerta', role: 'student', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
      //   { email: 'hcraig@ucb.edu', password: 'testing', firstName: 'Hashir', lastName: 'Craig', role: 'student', image: 'https://randomuser.me/api/portraits/men/33.jpg' },
      //   { email: 'jknox@ucb.edu', password: 'testing', firstName: 'Jannah', lastName: 'Knox', role: 'student', image: 'https://randomuser.me/api/portraits/women/11.jpg' },
      //   { email: 'jcannon@ucb.edu', password: 'testing', firstName: 'Joseff', lastName: 'Cannon', role: 'student', image: 'https://randomuser.me/api/portraits/men/34.jpg' },
      //   { email: 'mrobertson@ucb.edu', password: 'testing', firstName: 'Mari', lastName: 'Robertson', role: 'student', image: 'https://randomuser.me/api/portraits/women/12.jpg' },
      //   { email: 'nwhitworth@ucb.edu', password: 'testing', firstName: 'Natasha', lastName: 'Whitworth', role: 'student', image: 'https://randomuser.me/api/portraits/women/13.jpg' },
      //   { email: 'ebaxter@ucb.edu', password: 'testing', firstName: 'Emilio', lastName: 'Baxter', role: 'student', image: 'https://randomuser.me/api/portraits/men/35.jpg' },
      //   { email: 'ramos@ucb.edu', password: 'testing', firstName: 'Rafe', lastName: 'Amos', role: 'student', image: 'https://randomuser.me/api/portraits/men/36.jpg' },
      //   { email: 'ashields@ucb.edu', password: 'testing', firstName: 'Addison', lastName: 'Shields', role: 'student', image: 'https://randomuser.me/api/portraits/women/14.jpg' },
      //   { email: 'ehutchinson@ucb.edu', password: 'testing', firstName: 'Elise', lastName: 'Hutchinson', role: 'student', image: 'https://randomuser.me/api/portraits/women/15.jpg' },
      //   { email: 'iparks@ucb.edu', password: 'testing', firstName: 'Israel', lastName: 'Parks', role: 'student', image: 'https://randomuser.me/api/portraits/men/37.jpg' },
      //   { email: 'ahawkins@ucb.edu', password: 'testing', firstName: 'Aneesah', lastName: 'Hawkins', role: 'student', image: 'https://randomuser.me/api/portraits/women/16.jpg' },
      //   { email: 'ameyer@ucb.edu', password: 'testing', firstName: 'Asher', lastName: 'Meyer', role: 'student', image: 'https://randomuser.me/api/portraits/men/38.jpg' },
      //   { email: 'kpatterson@ucb.edu', password: 'testing', firstName: 'Kelly', lastName: 'Patterson', role: 'student', image: 'https://randomuser.me/api/portraits/women/17.jpg' }
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
      //     .catch(error => console.log(error));
      //   })
      //   })
        // let locationtable = [
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
        //   { building: 'Engineering', room: 316, maxOccupancy: 10, utilities: 'Yes'},
        //   { building: 'Virtual', utilities: 'No'}
        // ]
        // locationtable.forEach(item => {
        //   db.Location.create(item)
        //     .then(() =>
        //       console.log("locations table seeded"))
        //     .catch(error => console.log(error));
        // });
    })
