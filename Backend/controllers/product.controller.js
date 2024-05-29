const Product=require("../models/product.model")



//create product//admin
exports.createProduct=async(req,res,next)=>{
  const product=await Product.create(req.body);
  res.status(201).json({
    success:true,
    product
  })
}

//get request
exports.getAllProducts=async(req,res)=>{
  const product=await Product.find();
  res.status(200)
  .json({
    sucess:true,
    product
  })
}