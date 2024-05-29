const app = require("./app");
const dotenv = require("dotenv");

const databaseconnection=require("./database/db.js")



// Config
dotenv.config({ path: "./Config/config.env" });

//connect databse
databaseconnection();

// Set a default port if not provided in the environment variables
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
