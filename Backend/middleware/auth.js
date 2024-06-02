const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt =require("jsonwebtoken");
const User=require("../models/user.model.js");

exports.isAuthenticatedUser=catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies;
    // console.log(token);
    if(!token){
        return next(new ErrorHandler("please login to access this resources",401));
    }
    const decodeddata=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodeddata.id);
    next();
})
exports.authorizedRole=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this resourse`,403))
        }
        next();
    }
   
}