const router = require("express").Router();
const usersRoutes = require("./users");
const adminsRoutes = require("./admins");

// Post routes
router.use("/users", usersRoutes);
router.use("/admin", adminsRoutes)

module.exports = router;
