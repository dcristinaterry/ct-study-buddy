const router = require("express").Router();
const classRoutes = require("./class");
const locationRoutes = require("./location");
const sessionRoutes = require("./session");
const userRoutes = require("./user");

// Post routes
router.use("/class", classRoutes);
router.use("/location", locationRoutes);
router.use("/session", sessionRoutes);
router.use("/user", userRoutes);

module.exports = router;
