const express=require("express");
const { 
    registerPage,
     loginUser, 
     logoutUser,
      forgotPassword,
       getUserDetails,
      updateUserprofile,
     togetAllusers,
     togetSingleuser
        } = require("../controllers/user.controller.js");
const router=express.Router();
const {isAuthenticatedUser,authorizedRole}=require("../middleware/auth");


router.route("/register").post(registerPage);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").get(logoutUser);
router.route("/userdetails").get(isAuthenticatedUser,getUserDetails);
router.route("/userdetails/update").put(isAuthenticatedUser,updateUserprofile);
router.route("/admin/users").get(isAuthenticatedUser,authorizedRole("admin"),togetAllusers);
router.route("/admin/singleuser/:id").get(isAuthenticatedUser,authorizedRole("admin"),togetSingleuser);




module.exports=router;