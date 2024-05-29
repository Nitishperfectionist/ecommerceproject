const app = require("./app");
const dotenv = require("dotenv");

// Config
dotenv.config({ path: "./Config/config.env" });

// Set a default port if not provided in the environment variables
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
