const app = require("./app");
const dotenv = require("dotenv");
const databaseconnection=require("./database/db.js")

//handelling uncaught exception

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("shuting down server due to uncauht error")
})

// Config
dotenv.config({ path: "./Config/config.env" });
//connect databse
databaseconnection();

// Set a default port if not provided in the environment variables
const PORT = process.env.PORT || 3000;

const server=app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//unhandelled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);

    console.log("shut down the server");
  process.exit(1);

server.close(()=>{
    process.exit(1);
})
})
