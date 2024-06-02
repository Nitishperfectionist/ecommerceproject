const express=require("express");
const { registerPage, loginUser, logoutUser, forgotPassword} = require("../controllers/user.controller.js");
const router=express.Router();


router.route("/register").post(registerPage);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").get(logoutUser);


module.exports=router;