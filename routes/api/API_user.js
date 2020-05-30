// should contain all the "get routes" to view most user/class/session specific data
// and the create/delete routes for sessions as these will be user created
const router = require("express").Router();
const userController = require("../../controllers/userController");
const sessionController = require("../../controllers/sessionController");
const locationController = require("../../controllers/locationController");
const authenticatedUser = require("../../config/authenticatedUser.js");
const classController = require("../../controllers/classController");
const userSessionController = require("../../controllers/userSessionController")
const passport = require("../../config/passport");

// matches with "/api/user/"
router
  .route("/")
  .put(passport.authenticate("local"), function (req, res) {
    // console.log({user:req.user})
    let user = { ...req.user.dataValues, password: "youWish" }
    res.json(user)
    console.log("login successful!")
  })

router
  .route("/verifyUser")
  .get(authenticatedUser,function (req, res) {
    console.log("verifying user")
    // res.json(req.user)
    res.json(req.user)
  })

router
  .get('/logout', function (req, res) {
    console.log(req)
    console.log(res)
    req.logout();
    res.sendFile('/');
});
// Matches with "/api/user/:id"
router
  .route("/info/:id", authenticatedUser)
  .get(userController.findUser)
  .put(userController.update)
  
// Matches with "/api/class"
router
  .route("/allclasses/:id/classes")
  .get(classController.findAllClasses)

// ============= SESSIONS API=========
// Matches with "/api/session"
// find all sessions where user is participating
router
  .route("/info-session/:userid/participant-sessions")
  .get(sessionController.findAllParticipatinSessions)

router
  .route("/:userid/session/:sessionid")
  .get(sessionController.findOneSessionForUser)

// find all sessions for all classes
router
  .route("/info-session/:userid/allsessions")
  .get(sessionController.findAllSessionsAllClasses)

// find sessions where user is the host
router
  .route("/info-session/:userid/hosting")
  .get(sessionController.findAllSessionsAsHost)
  .post(sessionController.create)
  .delete(sessionController.remove)

router
  .route("/:sessionid")
  .put(sessionController.update)

router
  .route("/info-session/:classid/class-sessions")
  .get(sessionController.findAllSessionsOneClasses)


// =================UserSessions=API====================
router
  .route("/info-session/joinsession")
  .post(userSessionController.create)

router
  .route("/info-session/leavesession/:sessionId/:userId") 
  .delete(userSessionController.remove)

// =====================================================
// =====================LOCATIONS API ==================


router
  .route("/locations")
  .get(locationController.findAllLocations)

router
  .route("/location/:sessionid")
  // .get(locationController.findOne)

//   app.put("/api/user", passport.authenticate("local"), function (req, res) {
//     db.User.findOne({
//         where: {
//             username: req.body.username,
//             password: req.body.password
//         }

//     }).then(function (dbUser) {
//         console.log("passport checking user...")
//         // console.log(req.user);
//         // Added Passport logic for validating user
//         if (req.user) {
//             console.log("true");
//             // console.log(dbUser);
//             res.json(dbUser);
//         }
//         else { res.sendFile("/html/login.html", { root: path.join(__dirname, "../public") }) };
//     });
// })


module.exports = router;
