const express = require("express");

const app = express();
app.use(express.json());
//router 
const product=require("./routes/product.routes.js");

app.use("/api/v1",product);

module.exports=app;