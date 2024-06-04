const Order=require("../models/order.model");
const Product=require("../models/product.model");
const ErrorHandler = require("../utils/ErrorHandler.js");
const mongoose=require("mongoose");
const catchAsyncError=require("../middleware/catchAsyncError.js");
const ApiFeatures = require("../utils/apiFeatures.js");

//create new order 

exports.createNewOrder=catchAsyncError(async(req,res,next)=>{
    const{
        shippingInfo,
        orderItems,
         paymentInfo,
         itemsPrice,
         taxPrice,
         shippingPrice,
         totalPrice
        }
        = req.body;

 const order= await Order.create({
    shippingInfo,
        orderItems,
         paymentInfo,
         itemsPrice,
         taxPrice,
         shippingPrice,
         totalPrice,
         paidAt:Date.now(),
         user:req.user._id,
  })
  res.status(201).json({
    success:true,
    order
  })
})
//get single order details
exports.getSingleOrder=catchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return next(new ErrorHandler("order not found of this id",404))
    }
    res.status(201).json({
        success:true,
        order,
    })
})

//get logged user order
exports.getMyorder=catchAsyncError(async(req,res,next)=>{
    const orders=await Order.find({user:req.user._id})
    
    res.status(201).json({
        success:true,
        orders,
    })
})

//get all orders--admin
exports.getAllOrders=catchAsyncError(async(req,res,next)=>{
    const orders=await Order.find();

    let totalAmount=0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice;
    })
    
    res.status(201).json({
        success:true,
        totalAmount,
        orders,
    })
})

//update order sattus--admin
exports.updateOrderStatus=catchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);

  if(order.orderStatus === "delivered"){
   return next(new ErrorHandler("you have already delivered this order",404))
   
  }
  order.orderItems.forEach(async(order)=>{
     await updateStocks(order.product,order.quantity);
  })
  order.orderStatus=req.body.status;
  if(req.body.status ==="delivered"){
    order.deliveredAt=Date.now();
  }
  await order.save({validateBeforeSave: false});
    
    res.status(201).json({
        success:true,
        order,
    })
})
async function updateStocks(id,quantity){
    const product=await Product.findById(id);

    product.stock-= quantity;
    await product.save({validateBeforeSave: false});
    
}

//delete order
exports.deleteOrder=catchAsyncError(async(req,res,next)=>{
    const orders=await Order.findById(req.params.id);
    if(!orders){
        return next(new ErrorHandler("order not found of this id",404))
    }
    await orders.deleteOne();
    res.status(201).json({
        success:true,
    })
})
