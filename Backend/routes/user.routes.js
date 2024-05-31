const express=require("express");
const { registerPage } = require("../controllers/user.controller.js");
const router=express.Router();


router.route("/register").post(registerPage);



module.exports=router;