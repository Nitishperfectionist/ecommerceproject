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

//update product=admin

exports.updateProducts=async(req,res,next)=>{
  let product=await Product.findById(req.params.id);

  if(!product){
    res.status(500).json({
      success:false,
      message:"product not found"
    })
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
}

//delete product
exports.deleteProducts=async(req,res,next)=>{
  let product=await Product.findById(req.params.id);

  if(!product){
    res.status(500).json({
      success:false,
      message:"product not found",
    })
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
}