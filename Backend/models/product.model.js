
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
     rating:{
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
        type:String,
        required:[true,"please add stock"],
        maxLength:[4,"can not exceed 4 character"],
        default:1
    },
    reviews:[{
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
    }]
},{timestamps: true})

module.exports=mongoose.model("Product",productSchema);