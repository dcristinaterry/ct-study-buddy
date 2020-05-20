// should have access to ALL features to CRUD any element

const router = require("express").Router();
const userController = require("../../controllers/userController");
const sessionController = require("../../controllers/sessionController");
const locationController = require("../../controllers/locationController");
const classController = require("../../controllers/classController");

// Matches with "/api/users"
router
  .route("/")
  .get(userController.findAll)
  .post(userController.create);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

// Matches with "/api/session"
router
  .route("/")
  .get(sessionController.findAll)
  .post(sessionController.create);

// Matches with "/api/session/:id"
router
  .route("/:id")
  .get(sessionController.findById)
  .put(sessionController.update)
  .delete(sessionController.remove);

// Matches with "/api/location"
router
  .route("/")
  .get(locationController.findAll)
  .post(locationController.create);

// Matches with "/api/location/:id"
router
  .route("/:id")
  .get(locationController.findById)
  .put(locationController.update)
  .delete(locationController.remove);

 // Matches with "/api/location"
router
.route("/")
.get(classController.findAll)
.post(classController.create);

// Matches with "/api/location/:id"
router
.route("/:id")
.get(classController.findById)
.put(classController.update)
.delete(classController.remove);

module.exports = router;
