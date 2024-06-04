const express=require("express");
const { createNewOrder, getSingleOrder, getMyorder, getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/order.controller");
const {isAuthenticatedUser,authorizedRole}=require("../middleware/auth");
const router=express.Router();

router.route("/order/new").post(isAuthenticatedUser,createNewOrder);
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);
router.route("/orders/myorder").get(isAuthenticatedUser,getMyorder);
router.route("/admin/orders").get(isAuthenticatedUser,authorizedRole("admin"),getAllOrders)
router.route("/admin/orders/:id")
.put(isAuthenticatedUser,authorizedRole("admin"),updateOrderStatus)
.delete(isAuthenticatedUser,authorizedRole("admin"),deleteOrder);


module.exports=router;