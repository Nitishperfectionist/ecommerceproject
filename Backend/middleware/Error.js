const ErrorHandler =require("../utils/ErrorHandler.js");

module.exports=(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message=err.message || "internal server error";

    //wrong mongodb id error
    if(err.name==="CastError"){
      const message=`Resource not found invalidId:${err.path}`;
      err = new ErrorHandler(message,400)
    }

    //wrong dublicate key error
    if(err.code===11000){
      const message=`Dublicate ${Object.keys9(err.keyValue)} entered`;
      err = new ErrorHandler(message,400)
    }
   // jsonwebtoken error
   if(err.name==="jsonWebTokenError"){
    const message=`json web token is invalid,try again`;
    err = new ErrorHandler(message,400)
  }
  //token expired error
  if(err.name==="TokenExpiredError"){
    const message=`json web token is expired,try again`;
    err = new ErrorHandler(message,400)
  }


    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        error:err,
    })
}
