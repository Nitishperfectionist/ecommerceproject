const Product=require("../models/product.model");
const ErrorHandler = require("../utils/ErrorHandler.js");
const mongoose=require("mongoose");
const catchAsyncError=require("../middleware/catchAsyncError.js");
const ApiFeatures = require("../utils/apiFeatures.js");


//create product//admin
exports.createProduct=catchAsyncError(async(req,res,next)=>{

  req.body.user=req.user.id;
  const product=await Product.create(req.body);
  res.status(201).json({
    success:true,
    product
  })
})

//get all product
exports.getAllProducts=catchAsyncError(async(req,res)=>{

  const resultperPage=5;
  const productcount=await Product.countDocuments();
  const apiFeatures=new ApiFeatures(Product.find(),req.query)
  .search()
  .filter()
  .pagination(resultperPage);

  const product=await apiFeatures.query;
  res.status(200)
  .json({
    sucess:true,
    product,
    productcount,
  })
});
//get single productdetails

exports.getSingleProductDetails=catchAsyncError(async(req,res,next)=>{
  let product=await Product.findById(req.params.id);
  if(!product){
    return next(new ErrorHandler("product not found",404));
  }
  res.status(200).json({
    success:true,
    product
  })
  
});

// exports.getSingleProductDetails = async (req, res, next) => {
//   // Check if the provided id is a valid ObjectId
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return next(new ErrorHandler("Invalid product ID", 400));
//   }

//   let product;
//   try {
//       product = await Product.findById(req.params.id);
//   } catch (err) {
//       return next(new ErrorHandler("Internal Server Error", 500));
//   }

//   if (!product) {
//       return next(new ErrorHandler("Product not found", 404));
//   }

//   res.status(200).json({
//       success: true,
//       product
//   });
// };

//update product=admin

exports.updateProducts=catchAsyncError(async(req,res,next)=>{
  let product=await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
}
  product=await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidatotrs:true,
    useFindAndModify:false,
  });
  res.status(200).json({
    success:true,
    product,
  })
});


//delete product=admin
exports.deleteProducts=catchAsyncError(async(req,res,next)=>{
  let product=await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
}

  //you  can also use instead of this 
  //await product.remove();

  product=await Product.findByIdAndDelete(req.params.id,req.body,{
    new:true,
    runValidatotrs:true,
    useFindAndModify:false,
  })
  res.status(200).json({
    success:true,
    product:"product deleted successfully"
  })
});