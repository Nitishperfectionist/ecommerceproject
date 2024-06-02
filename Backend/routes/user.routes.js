const express=require("express");
const { registerPage, loginUser, logoutUser} = require("../controllers/user.controller.js");
const router=express.Router();


router.route("/register").post(registerPage);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);


module.exports=router;