// connection 
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/NewsApp")
.then(()=> {
    console.log("mongodb connected")
})

// user schema
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String
})

const User = mongoose.model("user",userSchema);

module.exports = User;