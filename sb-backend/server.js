const express = require("express");
const session = require("express-session")
// const routes = require("./routes");
const moment = require("moment")
// const passport = require("./config/passport");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models")

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "development") {
//   app.use(express.static("client/build"));
// }
// Add routes, both API and view
// app.use(routes);


db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
    let usertable = [
      { email: 'test@test.com', password: 'testing', firstName: 'test', lastName: 'test', role: 'admin' },
      { email: 'cristina@cristina.com', password: 'testing', firstName: 'Cristina', lastName: 'Terry', role: 'admin', image: 'https://media-exp1.licdn.com/dms/image/C4D03AQFaxqj0rTBR-Q/profile-displayphoto-shrink_200_200/0?e=1595462400&v=beta&t=fgQsiqeK6w_r2ltU-SizUL8F4p59vE5pNpxqIyFWxTQ' },
      { email: 'brad@brad.com', password: 'testing', firstName: 'Brad', lastName: 'Davis', role: 'admin', image: 'https://media-exp1.licdn.com/dms/image/C5603AQFUm1pTViCp1w/profile-displayphoto-shrink_200_200/0?e=1595462400&v=beta&t=e0DfY23faeKtF9Rehlob49poE-Lr5nac5UeuHscN0uI' },
      { email: 'ta@ta.com', password: 'testing', firstName: 'Teaching', lastName: 'Assistant', role: 'ta' },
      { email: 'tjohnson@ucb.edu', password: 'testing', firstName: 'Talitha', lastName: 'Johnson', role: 'student', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
      { email: 'jheath@ucb.edu', password: 'testing', firstName: 'Jad', lastName: 'Heath', role: 'student', image: 'https://randomuser.me/api/portraits/men/26.jpg' },
      { email: 'jmejia@ucb.edu', password: 'testing', firstName: 'Jensen', lastName: 'Mejia', role: 'student', image: 'https://randomuser.me/api/portraits/men/27.jpg' },
      { email: 'cbell@ucb.edu', password: 'testing', firstName: 'Cynthia', lastName: 'Bell', role: 'student', image: 'https://randomuser.me/api/portraits/women/7.jpg' },
      { email: 'bblackwell@ucb.edu', password: 'testing', firstName: 'Braxton', lastName: 'Blackwell', role: 'student', image: 'https://randomuser.me/api/portraits/men/28.jpg' },
      { email: 'oforster@ucb.edu', password: 'testing', firstName: 'Olli', lastName: 'Forster', role: 'student', image: 'https://randomuser.me/api/portraits/men/29.jpg' },
      { email: 'vhooper@ucb.edu', password: 'testing', firstName: 'Varun', lastName: 'Hooper', role: 'student', image: 'https://randomuser.me/api/portraits/men/30.jpg' },
      { email: 'swoodcock@ucb.edu', password: 'testing', firstName: 'Sumayyah', lastName: 'Woodcock', role: 'student', image: 'https://randomuser.me/api/portraits/women/8.jpg' },
      { email: 'ngarrett@ucb.edu', password: 'testing', firstName: 'Niamh', lastName: 'Garrett', role: 'student', image: 'https://randomuser.me/api/portraits/women/9.jpg' },
      { email: 'halvarez@ucb.edu', password: 'testing', firstName: 'Harvey', lastName: 'Alvarez', role: 'student', image: 'https://randomuser.me/api/portraits/men/31.jpg' },
      { email: 'ahastings@ucb.edu', password: 'testing', firstName: 'Anne', lastName: 'Hastings', role: 'student', image: 'https://randomuser.me/api/portraits/women/10.jpg' },
      { email: 'ahuerta@ucb.edu', password: 'testing', firstName: 'Atlas', lastName: 'Huerta', role: 'student', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { email: 'hcraig@ucb.edu', password: 'testing', firstName: 'Hashir', lastName: 'Craig', role: 'student', image: 'https://randomuser.me/api/portraits/men/33.jpg' },
      { email: 'jknox@ucb.edu', password: 'testing', firstName: 'Jannah', lastName: 'Knox', role: 'student', image: 'https://randomuser.me/api/portraits/women/11.jpg' },
      { email: 'jcannon@ucb.edu', password: 'testing', firstName: 'Joseff', lastName: 'Cannon', role: 'student', image: 'https://randomuser.me/api/portraits/men/34.jpg' },
      { email: 'mrobertson@ucb.edu', password: 'testing', firstName: 'Mari', lastName: 'Robertson', role: 'student', image: 'https://randomuser.me/api/portraits/women/12.jpg' },
      { email: 'nwhitworth@ucb.edu', password: 'testing', firstName: 'Natasha', lastName: 'Whitworth', role: 'student', image: 'https://randomuser.me/api/portraits/women/13.jpg' },
      { email: 'ebaxter@ucb.edu', password: 'testing', firstName: 'Emilio', lastName: 'Baxter', role: 'student', image: 'https://randomuser.me/api/portraits/men/35.jpg' },
      { email: 'ramos@ucb.edu', password: 'testing', firstName: 'Rafe', lastName: 'Amos', role: 'student', image: 'https://randomuser.me/api/portraits/men/36.jpg' },
      { email: 'ashields@ucb.edu', password: 'testing', firstName: 'Addison', lastName: 'Shields', role: 'student', image: 'https://randomuser.me/api/portraits/women/14.jpg' },
      { email: 'ehutchinson@ucb.edu', password: 'testing', firstName: 'Elise', lastName: 'Hutchinson', role: 'student', image: 'https://randomuser.me/api/portraits/women/15.jpg' },
      { email: 'iparks@ucb.edu', password: 'testing', firstName: 'Israel', lastName: 'Parks', role: 'student', image: 'https://randomuser.me/api/portraits/men/37.jpg' },
      { email: 'ahawkins@ucb.edu', password: 'testing', firstName: 'Aneesah', lastName: 'Hawkins', role: 'student', image: 'https://randomuser.me/api/portraits/women/16.jpg' },
      { email: 'ameyer@ucb.edu', password: 'testing', firstName: 'Asher', lastName: 'Meyer', role: 'student', image: 'https://randomuser.me/api/portraits/men/38.jpg' },
      { email: 'kpatterson@ucb.edu', password: 'testing', firstName: 'Kelly', lastName: 'Patterson', role: 'student', image: 'https://randomuser.me/api/portraits/women/17.jpg' }
    ]
    usertable.forEach(item => {
      db.User.create(item)
        .then(() =>
          console.log("user table seeded"))
        .catch(error => console.log(error));
    })
    let classtable = [
      { Subject: 'Accounting', Class: '101', Instructor: 'Leilani Macfarlane', TA: 'Samuel Sharma' },
      { Subject: 'Accounting', Class: '201', Instructor: 'Amos Maguire', TA: 'Leja Cardenas' },
      { Subject: 'Accounting', Class: '302', Instructor: 'Leilani Macfarlane', TA: 'Liam French' },
      { Subject: 'Accounting', Class: '402', Instructor: 'Amos Maguire', TA: 'Tania Huynh' },
      { Subject: 'Art History', Class: '101', Instructor: 'Kris Cantu', TA: 'Aj Truong' },
      { Subject: 'Art History', Class: '201', Instructor: 'Sonia Miranda', TA: 'Alayna Davey' },
      { Subject: 'Art History', Class: '302', Instructor: 'Kris Cantu', TA: 'Lawson Carver' },
      { Subject: 'Art History', Class: '402', Instructor: 'Sonia Miranda', TA: 'Sonya Daniels' },
      { Subject: 'Biology', Class: '101', Instructor: 'Alexia Butler', TA: 'Erika Ewing' },
      { Subject: 'Biology', Class: '201', Instructor: 'Adaline Quinn', TA: 'Macauley Calderon' },
      { Subject: 'Biology', Class: '302', Instructor: 'Alexia Butler', TA: 'Kit Parrish' },
      { Subject: 'Biology', Class: '402', Instructor: 'Adaline Quinn', TA: 'Phoenix Fleming' },
      { Subject: 'Chemistry', Class: '101', Instructor: 'Roksana Rutledge', TA: 'Mekhi Strong' },
      { Subject: 'Chemistry', Class: '201', Instructor: 'Trent Adams', TA: 'Stefania Romero' },
      { Subject: 'Chemistry', Class: '302', Instructor: 'Roksana Rutledge', TA: 'Aarron Huber' },
      { Subject: 'Chemistry', Class: '402', Instructor: 'Trent Adams', TA: 'Rudi Irwin' },
      { Subject: 'Computer Science', Class: '101', Instructor: 'Macauley Kim', TA: 'Rima Hull' },
      { Subject: 'Computer Science', Class: '201', Instructor: 'Haley Hussain', TA: 'Derren Beattie' },
      { Subject: 'Computer Science', Class: '302', Instructor: 'Macauley Kim', TA: 'Nawal Emerson' },
      { Subject: 'Computer Science', Class: '402', Instructor: 'Haley Hussain', TA: 'Chantelle Glass' },
      { Subject: 'Economics', Class: '101', Instructor: 'Susannah Owens', TA: 'Melissa Downes' },
      { Subject: 'Economics', Class: '201', Instructor: 'Pascal Kelly', TA: 'Taine Soto' },
      { Subject: 'Economics', Class: '302', Instructor: 'Susannah Owens', TA: 'Mali Mcguire' },
      { Subject: 'Economics', Class: '402', Instructor: 'Pascal Kelly', TA: 'Cade Forbes' },
      { Subject: 'Electrical Engineering', Class: '101', Instructor: 'Frances Glover', TA: 'Blythe Vo' },
      { Subject: 'Electrical Engineering', Class: '201', Instructor: 'Kyal Woodley', TA: 'Adina Sanders' },
      { Subject: 'Electrical Engineering', Class: '302', Instructor: 'Frances Glover', TA: 'Marisa Mason' },
      { Subject: 'Electrical Engineering', Class: '402', Instructor: 'Kyal Woodley', TA: 'Humera Broughton' },
      { Subject: 'English', Class: '101', Instructor: 'Charley Bautista', TA: 'Avleen Hansen' },
      { Subject: 'English', Class: '201', Instructor: 'Aarron Petty', TA: 'Ava-May Edwards' },
      { Subject: 'English', Class: '302', Instructor: 'Charley Bautista', TA: 'Hakeem Dickerson' },
      { Subject: 'English', Class: '402', Instructor: 'Aarron Petty', TA: 'Jamelia Garrett' },
      { Subject: 'Finance', Class: '101', Instructor: 'Dalton Trejo', TA: 'Aahil Larsen' },
      { Subject: 'Finance', Class: '201', Instructor: 'Elinor Daugherty', TA: 'Haleema Nash' },
      { Subject: 'Finance', Class: '302', Instructor: 'Dalton Trejo', TA: 'Desiree Holloway' },
      { Subject: 'Finance', Class: '402', Instructor: 'Elinor Daugherty', TA: 'Kane Conway' },
      { Subject: 'French', Class: '101', Instructor: 'Marguerite Zamora', TA: 'Mathias Boone' },
      { Subject: 'French', Class: '201', Instructor: 'Timur Hackett', TA: 'Khushi Handley' },
      { Subject: 'French', Class: '302', Instructor: 'Marguerite Zamora', TA: 'Bryony Vargas' },
      { Subject: 'French', Class: '402', Instructor: 'Timur Hackett', TA: 'Darren Archer' },
      { Subject: 'Full Stack', Class: '101', Instructor: 'Jerome Chenette', TA: 'Kerwin Hy, Mahi Gunasekaran' },
      { Subject: 'History', Class: '101', Instructor: 'Brielle Willis', TA: 'Eduardo Rodriguez' },
      { Subject: 'History', Class: '201', Instructor: 'Nabeel Handley', TA: 'Michalina Olson' },
      { Subject: 'History', Class: '302', Instructor: 'Brielle Willis', TA: 'Tyler-James Sanchez' },
      { Subject: 'History', Class: '402', Instructor: 'Nabeel Handley', TA: 'Malikah Mckenna' },
      { Subject: 'Italian', Class: '101', Instructor: 'Keith Pruitt', TA: 'Markus Whitehouse' },
      { Subject: 'Italian', Class: '201', Instructor: 'Leland Cummings', TA: 'Harriette Mayo' },
      { Subject: 'Italian', Class: '302', Instructor: 'Keith Pruitt', TA: 'Macie Kaye' },
      { Subject: 'Italian', Class: '402', Instructor: 'Leland Cummings', TA: 'Mabel Moody' },
      { Subject: 'Management', Class: '101', Instructor: 'Kester Chen', TA: 'Cecilia Randall' },
      { Subject: 'Management', Class: '201', Instructor: 'Awais Amin', TA: 'Nel Wright' },
      { Subject: 'Management', Class: '302', Instructor: 'Kester Chen', TA: 'Caris Palmer' },
      { Subject: 'Management', Class: '402', Instructor: 'Awais Amin', TA: 'Sila Velez' },
      { Subject: 'Mathematics', Class: '101', Instructor: 'Jade Hussain', TA: 'Daisy-Mae Piper' },
      { Subject: 'Mathematics', Class: '201', Instructor: 'Jay-Jay Weber', TA: 'Asif Jordan' },
      { Subject: 'Mathematics', Class: '302', Instructor: 'Jade Hussain', TA: 'Cienna Rahman' },
      { Subject: 'Mathematics', Class: '402', Instructor: 'Jay-Jay Weber', TA: 'Sayed Franklin' },
      { Subject: 'Music', Class: '101', Instructor: 'Kristina Lovell', TA: 'Kirstie Shields' },
      { Subject: 'Music', Class: '201', Instructor: 'Tadhg Barclay', TA: 'Kobi Hensley' },
      { Subject: 'Music', Class: '302', Instructor: 'Kristina Lovell', TA: 'Cally Perez' },
      { Subject: 'Music', Class: '402', Instructor: 'Tadhg Barclay', TA: 'Dagwood Holland' },
      { Subject: 'Philosophy', Class: '101', Instructor: 'Rosalie Mccaffrey', TA: 'Adele Elliott' },
      { Subject: 'Philosophy', Class: '201', Instructor: 'Aliyah Small', TA: 'Cloe Allman' },
      { Subject: 'Philosophy', Class: '302', Instructor: 'Rosalie Mccaffrey', TA: 'Amelie Dunne' },
      { Subject: 'Philosophy', Class: '402', Instructor: 'Aliyah Small', TA: 'Sultan Owen' },
      { Subject: 'Physics', Class: '101', Instructor: 'Mahdi Buckner', TA: 'Amit Naylor' },
      { Subject: 'Physics', Class: '201', Instructor: 'Maia Waters', TA: 'Freddie Stephenson' },
      { Subject: 'Physics', Class: '302', Instructor: 'Mahdi Buckner', TA: 'Havin Davie' },
      { Subject: 'Physics', Class: '402', Instructor: 'Maia Waters', TA: 'Jordan Brown' },
      { Subject: 'Political Science', Class: '101', Instructor: 'Malakai Connor', TA: 'Jaylan Hirst' },
      { Subject: 'Political Science', Class: '201', Instructor: 'Molly Whitaker', TA: 'Arfa Plummer' },
      { Subject: 'Political Science', Class: '302', Instructor: 'Malakai Connor', TA: 'Milla Hale' },
      { Subject: 'Political Science', Class: '402', Instructor: 'Molly Whitaker', TA: 'Aronas Castaneda' },
      { Subject: 'Psychology', Class: '101', Instructor: 'Anthony Colon', TA: 'Eliana Vickers' },
      { Subject: 'Psychology', Class: '201', Instructor: 'Merlin Robson', TA: 'Daniaal Molloy' },
      { Subject: 'Psychology', Class: '302', Instructor: 'Anthony Colon', TA: 'Jess Warner' },
      { Subject: 'Psychology', Class: '402', Instructor: 'Merlin Robson', TA: 'Ela Prentice' },
      { Subject: 'Spanish', Class: '101', Instructor: 'Vera Hastings', TA: 'Connar Shannon' },
      { Subject: 'Spanish', Class: '201', Instructor: 'Shona Good', TA: 'Ricky Sanford' },
      { Subject: 'Spanish', Class: '302', Instructor: 'Vera Hastings', TA: 'Dustin Reyes' },
      { Subject: 'Spanish', Class: '402', Instructor: 'Shona Good', TA: 'Kajol Page' }
    ]
    classtable.forEach(item => {
      db.User.create(item)
        .then(() =>
          console.log("class table seeded"))
        .catch(error => console.log(error));
      })
      let locationtable = [
        { building: 'Virtual', utilities: 'No'},
        { building: 'Bartle Library', room: 202, maxOccupancy: 10, utilities: 'No'},
        { building: 'Bartle Library', room: 310, maxOccupancy: 8, utilities: 'No'},
        { building: 'Bartle Library', room: 221, maxOccupancy: 20, utilities: 'No'},
        { building: 'Eisnehower Hall', room: 165, maxOccupancy: 20, utilities: 'No'},
        { building: 'Eisnehower Hall', room: 167, maxOccupancy: 20, utilities: 'No'},
        { building: 'Eisnehower Hall', room: 169, maxOccupancy: 20, utilities: 'No'},
        { building: 'Science Library', room: 335, maxOccupancy: 12, utilities: 'Yes'},
        { building: 'Science Library', room: 337, maxOccupancy: 10, utilities: 'Yes'},
        { building: 'Science Library', room: 339, maxOccupancy: 12, utilities: 'Yes'},
        { building: 'Engineering', room: 312, maxOccupancy: 8, utilities: 'Yes'},
        { building: 'Engineering', room: 314, maxOccupancy: 16, utilities: 'Yes'},
        { building: 'Engineering', room: 316, maxOccupancy: 10, utilities: 'Yes'}
      ]
      locationtable.forEach(item => {
        db.User.create(item)
          .then(() =>
            console.log("locations table seeded"))
          .catch(error => console.log(error));
      });
  });
