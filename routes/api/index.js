const router = require("express").Router();
const usersRoutes = require("./API_user");
const adminsRoutes = require("./API_admins");

// Post routes
router.use("/user", usersRoutes);
router.use("/admin", adminsRoutes)

module.exports = router;
