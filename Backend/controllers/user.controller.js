const ErrorHandler = require("../utils/ErrorHandler.js");
const mongoose=require("mongoose");
const catchAsyncError=require("../middleware/catchAsyncError.js");
const User=require("../models/user.model.js");
const sendToken = require("../utils/jwtToken.js");


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
    sendToken(user,201,res);
});

//login user

exports.loginUser=catchAsyncError(async(req,res,next)=>{
    const{email,password}=req.body;
    //check eamil and password present or not
    if(!email || !password){
        return next(new ErrorHandler("please enter email and password",400));
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("invalid email and password",401));
    }

    const isPasswordMatched=user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("email and password doesnot matched",401));
    }
  
   sendToken(user,200,res);
})