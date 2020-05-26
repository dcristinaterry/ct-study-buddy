  
// This is middleware for restricting routes a user is not allowed to visit if not logged in

// var roles = require("../roles.js")


module.exports = function (req, res, next) {

    // function checkIsInRole(req, res, roles) {
    //   const hasRole = (req.user.role === roles)
    //   return hasRole
    // }
  
    // If the user is logged in, continue with the request to the restricted route
    if (req.user) {

      if(req.user.role==="admin"){
        return next();
      }
      // we have user login
      // if (req.user.role === roles.Administrator) {
      //   return res.redirect("/admin")
      // } else {
      // }
    }
  
    // If the user isn't logged in, redirect them to the login page
    // return res.redirect("/");
  };