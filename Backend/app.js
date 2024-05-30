const express = require("express");

const app = express();

const errorMiddleware=require("./middleware/Error.js")
app.use(express.json());
//router 
const product=require("./routes/product.routes.js");

app.use("/api/v1",product);

//error handelling middleware
app.use(errorMiddleware);

module.exports=app;