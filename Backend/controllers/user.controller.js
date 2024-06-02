const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncError=require("../middleware/catchAsyncError.js");
const User=require("../models/user.model.js");
const sendToken = require("../utils/jwtToken.js");
const sendEmail=require("../utils/sendEmail.js");

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

//logout function

exports.logoutUser=catchAsyncError(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,

    })

    res.status(200).json({
        success:true,
        message:"logout sucessfully"
    })
})

//forgot password

// exports.forgotPassword=catchAsyncError(async(req,res,next)=>{
//     const user= await User.findOne({email:req.body.email});

//     if(!user){
//         return next(new ErrorHandler("user not found",404));
//     }
//     //generate password token
//    const resetToken= user.getResetPassword();

//    await user.save({validateBeforeSave:false});

//    //for email
//    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

//    const message=`your reset password token:\n\n ${resetPasswordUrl} \n\n if you haven
//    ot requested this email,please ignore it`;


//    try{
//      await sendEmail({
//       email:user.email,
//       subject:"ecommerce pasword recovery",
//       message

//      })
//      res.status({
//         success:true,
//         message:`email sent to${user.email} successfully`,
//      })
//    }catch(error){
//     user.resetPasswordToken=undefined;
//     user.resetPasswordExpired=undefined;
//     await user.save({validateBeforeSave:false});

//     return next(new ErrorHandler(error.message,500))
//    }
// })

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Generate password token
    const resetToken = user.getResetPassword();

    await user.save({ validateBeforeSave: false });

    // Generate reset password URL
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your reset password token:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Ecommerce Password Recovery",
            message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpired = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});
