
// should have access to ALL features to CRUD any element

const router = require("express").Router();
const userController = require("../../controllers/userController");
// const sessionController = require("../../controllers/sessionController");
const locationController = require("../../controllers/locationController");
const classController = require("../../controllers/classController");
const authenticatedAdmin = require("../../config/authenticatedAdmin")

// Matches with "/api/users"
router
  .route("/user")
  // .get(userController.findAllUsers)
  // .post(userController.create)

router
  .route("/user/:id", authenticatedAdmin)  
  // .get(userController.findUser)
  .put(userController.update)
  .delete(userController.remove)

router
  .route("/class")
  // .get(classController.findAllClass)
  .post(classController.create)

router
  .route("/class/:id")  
  // .get(classController.findClass)
  .put(classController.update)
  .delete(classController.remove)

// Matches with "/api/location"
router
  .route("/location")
  // .get(locationController.findAllLocation)
  .post(locationController.create)

router
  .route("/location/:id")  
  // .get(locationController.findLocation)
  .put(locationController.update)
  .delete(locationController.remove)

module.exports = router;
