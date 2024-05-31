const ErrorHandler = require("../utils/ErrorHandler.js");
const mongoose=require("mongoose");
const catchAsyncError=require("../middleware/catchAsyncError.js");
const User=require("../models/user.model.js")


//Register a user

exports.registerPage=catchAsyncError(async(req,res,next)=>{
    const{name,email,password}=req.body;

    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"sample1",
            url:"profilepicurl"
        }
    });
    const token=user.getJWTToken();
    
    res.status(201).json({
        success:true,
        token,
    });
});