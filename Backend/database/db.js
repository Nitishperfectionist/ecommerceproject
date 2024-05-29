const mongoose =require("mongoose");

const databaseConnected=()=>{
    mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then((data)=>{
         console.log(`Mongodb connect successfully : ${data.connection.host}`)
    }).catch((error)=>{
        console.log(error)
    });
}
module.exports=databaseConnected;