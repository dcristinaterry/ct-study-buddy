// should contain all the "get routes" to view most user/class/session specific data
// and the create/delete routes for sessions as these will be user created

const router = require("express").Router();
const userController = require("../../controllers/userController");
const sessionController = require("../../controllers/sessionController");
const locationController = require("../../controllers/locationController");
const classController = require("../../controllers/classController");

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(userController.findUser)
  .put(userController.update)

// Matches with "/api/class"
router
  .route("/all/:id/classes")
  .get(classController.findAllClasses)

// Matches with "/api/session"
router
  .route("/:userid/session")
  .get(sessionController.findAllSessions)

router
  .route("/:userid/session/:sessionid")
  .put(sesssionController.joinSession)

router
  .router("/:userid/session/hosting")
  .get(sessionController.findAllAsHost)
  .post(sessionController.create)
  .delete(sessionController.remove)
  .put(sessionController.update)

router
  .router("/:classid/session")
  .get(sessionController.findAllForClass)

router
  .route("/locations")
  .get(locationController.findAll)
 
router
  .route("/location/:sessionid") 
  .get(locationController.findOne)

router
  .route("/session/:id")
  .get(locationController.findSessionById)

    

// router
//   .router()
// // Matches with "/api/session/:id"

// router
//   .route("/:id")
//   .get(sessionController.findById)
//   .put(sessionController.update)
//   .delete(sessionController.remove);

// // Matches with "/api/location"
//   .post(locationController.create);

// // Matches with "/api/location/:id"
// router
//   .route("/:id")
//   .get(locationController.findById)
//   .put(locationController.update)
//   .delete(locationController.remove);


module.exports = router;
