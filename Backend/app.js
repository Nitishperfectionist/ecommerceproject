const express = require("express");
const cookieparser=require("cookie-parser");
const app = express();

const errorMiddleware=require("./middleware/Error.js")
app.use(express.json());
app.use(cookieparser());

//router 
const product=require("./routes/product.routes.js");
const user=require("./routes/user.routes.js");


app.use("/api/v1",product);
app.use("/api/v1",user);
//error handelling middleware
app.use(errorMiddleware);

module.exports=app;