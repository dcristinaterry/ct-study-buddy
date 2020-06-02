# P3-Study-Buddy
[<img src="https://img.shields.io/badge/License-MIT-blue.svg">](https://opensource.org/licenses/MIT) 

## Description

The idea behind this application is to allow collegiate or graduate level students to interact within their own class/cohort to better schedule and host group study sessions.

## Table of Contents

  * [Technology](#Technology)

  * [Summary](#Summary)

  * [Learning-Points](#Learning-Points)
  
  * [License](#License)
  
  * [Contributing](#Contributing)
  
  * [Installation](#Installation)
  
  * [Tests](#Tests)
  
  * [Questions](#Questions)

## Technologies Used
- HTML - used to create elements on the DOM
- CSS - used to add style to the deployed page
- JavaScript - used to create the logic controlling the client-side application
- Bootstrap - automate syling elements
- jQuery - library supplement to JavaScript controlling application logic
- Axios - a library which allows HTTP requests
- Moment.js - used to aid in apportioning time to some elements 
- DatePicker - a simple and reusable Datepicker component for React
- Node.js - runtime environment which executes the JS code
- Express - framework for Node.js to create a server
- MySQL Workbench - database used for storing and calling information on commandline application
- Sequelize - a promise-based Node.js ORM for MySQL
- React - a JS library for building user interfaces
- JSX - similar to HTML, this can be used to structure component rendering within React
- Git - version control system to track changes to source code
- GitHub - hosts repository that can be deployed to GitHub Pages
- Heroku - host for deployed application

## Summary

In our attempt to create a streamlined application to allow students to connect and aid each other through independent study sessions, we were faced with several challenges.  The first of which was how we would separate authentication routes for situations where a user or admin would be accessing the application:

authenticatedUser.js
```
module.exports = function (req, res, next) {
    if (req.user) {            
      if(req.user.role !== "admin"){
        return next();
      }
    }else{
      console.log("user doesn't exists")
      return res.redirect("/");
    }    
  };
```

App_User.js
```
import axios from 'axios'
export default {
    authenticate: function (loginData) {
        return axios.put("/api/user", loginData)
    },
    verifyUser: function (sessionId) {
        console.log("requesting verify")
        return axios.get("/api/user/verifyUser")
    },
```

App_user.js
```
router
  .route("/")
  .put(passport.authenticate("local"), function (req, res) {
    let user = { ...req.user.dataValues, password: "youWish" }
    res.json(user)
    console.log("login successful!")
  })

router
  .route("/verifyUser")
  .get(authenticatedUser,function (req, res) {
    console.log("verifying user")
    res.json(req.user)
  })
```

With an authenticated user now accessing the site, we were faced with another task of ensuring all data would be rendering properly depending on the user's actions.  Given that we are saving a plethora of data to state, it was vital that realtime updates to state would display accordingly, as executed by the following code:

profilePanel.js
```
    const oneClassSessions = (item) => {
        API_User.getSessionsForOneClass(item).then(classSess => {
            dispatch({
                type: "setAllSessions",
                sessions: classSess.data
            })
        })
    }

    const allClassSessions = () => {
        API_User.getAllUserSessions(state.currentUser.id).then(sessionResp => {
            dispatch({
                type: "setAllSessions",
                sessions: sessionResp.data
            })
        })
    }
```

GlobalState.js
```
case "setAllSessions":
      return {
        ...state,
        sessions: action.sessions,
      };
```      

With regards to the data that would be displayed, a complex set of data queries were executed through sequelize to pull data for each user, based upon the classes they are in, and any sessions they had signed up to attend. An example of the query for the sessions a user would be attending, please see the below code:

sessionController.js
```
module.exports = {
    findAllParticipatinSessions: function (req, res) {
        db.UserSession.findAll({
            where: {
                userId: req.params.userid
            },
            include: {
                model: db.Session,
                include: [{
                    model: db.Class,
                    attributes: ["subject", "class"]
                },{
                    model: db.User, as: "host",
                    attributes: ["firstName", "lastName", "image"]
                },{
                    model: db.UserSession,
                    include: {
                        model: db.User,
                        attributes: ["firstName", "lastName", "image"]
                    }
                },{
                    model: db.Location,
                    attributes: ["building", "room"]
                }]
            }
        }
        ).then(participatingSessions => {
            let allSessions = [];
            for (let i = 0; i < participatingSessions.length; i++) {
                let sessionInfo = participatingSessions[i].dataValues.Session.dataValues
                let classInfo = participatingSessions[i].dataValues.Session.Class.dataValues
                let hostInfo = participatingSessions[i].dataValues.Session.host.dataValues
                let locationInfo = participatingSessions[i].dataValues.Session.Location.dataValues
                let participants = participatingSessions[i].dataValues.Session.UserSessions
                const sessionObject = {}
                sessionObject.sessionId = sessionInfo.id
                sessionObject.hostid = sessionInfo.hostId
                sessionObject.userImage = hostInfo.image
                sessionObject.hostName = hostInfo.firstName + " " + hostInfo.lastName
                sessionObject.classId = sessionInfo.ClassId
                sessionObject.className = classInfo.subject + " " + classInfo.class
                sessionObject.sessionSubject = sessionInfo.subject
                let formattedDate = moment(sessionInfo.sessionDate).format("M-D-YY hh:mm a")
                sessionObject.sessionDate = formattedDate
                sessionObject.participants = participants
                sessionObject.locationBuilding = locationInfo.building
                sessionObject.locationRoom =locationInfo.room
                allSessions.push(sessionObject)
            }
            res.json(allSessions)
        })
            .catch(err => res.status(422).json(err));
    },
```

To demonstrate the functionality of the application, we present the following gif:

<img src="https://github.com/crisdc88/P3-study-budy/blob/master/sb-client/public/StudyBuddy_Functionality.gif">

## Learning-Points

The challenge of this application pushed our team to consider a real work use case for a product.  Included with that was the consideration of how we would best use the technology available to deploy our app.  While we wanted to explore a full MERN stack, with the database we were constructing, using Mongo as our database was not really the best direction.  This did not take away from our experience in building out a complex database to work for our React application.

## Contributing

Jerome Chenette, Kerwin Hy, Mahi Gunasekaran, Cristina Terry, Brad Davis

## Installation

To install necessary dependencies for this application, the following commands are required from a root directory:

`npx create-react-app <application name>` - This command will install all the base dependencies to bootstrap a react app

`cd <application name>` - Once your react app is created, you can move into that directory

`npm start` - Command to run the application in a development mode

For those who wish to clone or fork this repo, the following steps should be followed:

For those who wish to clone or fork this repo, the following steps should be followed:

Clone:
1) On GitHub, navigate to the main page of the repository.
2) Under the repository name, click Clone or download.
3) To clone the repository using HTTPS, under "Clone with HTTPS", click the clipboard icon. To clone the repository using an SSH key, including a certificate issued by your organization's SSH certificate authority, click Use SSH, then click the clipboard icon.
4) Open your local Terminal
5) Move into the directory location where you would like the cloned repo to sit.
6) Type `git clone` then paste the URL copied from earlier so that your would see the following - `$ git clone https://github.com/cristdc88/google-search.git`
7) Press enter

Fork:
1) On GitHub, navigate to the main page of the repository.
2) In the top-right corner of the page, click Fork.

For more detailed instructions, you can visit GitHub directly to <a herf="https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository">Clone</a> or <a herf="https://help.github.com/en/github/getting-started-with-github/fork-a-repo">Fork</a>

## Tests

No tests were required for this application

## Questions

<img src="https://avatars0.githubusercontent.com/u/61372364?v=4" alt="avatar" style="border-radius: 16px" width="30">

[Cristina Terry](https://github.com/crisdc88) directly at crisdc88@gmail.com

<img src="https://avatars3.githubusercontent.com/u/61176147?v=4" alt="avatar" style="border-radius: 16px" width="30">

[Brad Davis](https://github.com/davisbradleyj) directly at davis.bradleyj@gmail.com