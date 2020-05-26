  
// This is middleware for restricting routes a user is not allowed to visit if not logged in

// var roles = require("../roles.js")


module.exports = function (req, res, next) {

    // function checkIsInRole(req, res, roles) {
    //   const hasRole = (req.user.role === roles)
    //   return hasRole
    // }
    console.log("authenticated user:", req.user)
    // If the user is logged in, continue with the request to the restricted route
    
    if (req.user) {            
      console.log("checking user authenticated")

      if(req.user.role !== "admin"){

        console.log("user exists")
        return next();
      }
      // we have user login
      // if (req.user.role === roles.Administrator) {
      //   return res.redirect("/admin")
      // } else {
      // }
    }else{
      console.log("user doesn't exists")
      return res.redirect("/");
    }
    // If the user isn't logged in, redirect them to the login page
    
  };