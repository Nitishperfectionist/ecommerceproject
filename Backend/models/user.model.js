const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter name"],
        maxLength:[30,"name should not be exceed 30 caharcter"],
        minLength:[4,"name should be minimum 4 character"]
    },
    email:{
        type:String,
        required:[true,"plaese enter an email"],
        unique:true,
        validate:[validator.isEmail,"please enter a valid email"],

    },
    password:{
        type:String,
        required:[true,"plaese enter a password"],
        unique:true,
        minLength:[8,"password shold be greater than 8 character"],
        select:false,
    },
    avatar:{
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
    },
    role:{
        type:String,
        default:"User",
    },
    resetPasswordToken:String,
    resetPasswordExpired:Date,
   
})
//password modification//encrypted password 
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})
//jwt token creation
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRETIME,
    })
}
//compare password
userSchema.methods.comparePassword=async function(enterpassword){
    return await bcrypt.compare(enterpassword,this.password);
}

module.exports=mongoose.model("User",userSchema);