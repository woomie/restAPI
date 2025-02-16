require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());  // For parsing JSON request bodies
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public"));

//importing all my routes
const users = require("./routes/users");
const expenses = require("./routes/expenses");
const income  = require("./routes/income");

//use the routes we have created above
app.use("/users", users);
app.use("/expenses", expenses);
app.use("/income", income);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`listening on Port: ${PORT}`);
})