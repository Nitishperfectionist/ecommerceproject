const express=require("express");
const { registerPage, loginUser } = require("../controllers/user.controller.js");
const router=express.Router();


router.route("/register").post(registerPage);
router.route("/login").post(loginUser);



module.exports=router;