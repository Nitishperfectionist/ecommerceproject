
const mongoose=require("mongoose");


const productSchema = new mongoose.Schema({
     name:{
        type:String,
        required:[true,"productname should be nedded"]
     },
     
     description:{
        type:String,
        required:[true,"please add product description"]
     },
     price:{
        type:Number,
        required:[true,"please add price"],
        maxLength:[8,"price donot exceed 8 character"],
     },
     ratings:{
        type:Number,
        default:0
     },
     images:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
     }
    ],
    category:{
        type:String,
        required:[true,"plaese add category name"]
    },
    stock:{
        type:Number,
        required:[true,"please add stock"],
        maxLength:[4,"can not exceed 4 character"],
        default:1
    },
    numberofreviews:{
         type:Number,
         default:0,
    },
    reviews:[{
      user:{
         type:mongoose.Schema.ObjectId,
         ref:"User",
         required:true,
   
       },
          name:{
            type:String,
            required:true,
          },
          rating:{
            type:String,
            required:true,
          },
          comment:{
            type:String,
            required:true
          }
    }],
    user:{
      type:mongoose.Schema.ObjectId,
      ref:"User",
      required:true,

    }
},{timestamps: true})

module.exports=mongoose.model("Product",productSchema);