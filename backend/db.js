// connection 

const {initializeApp} = require("firebase/app")
const {getStorage} = require("firebase/storage");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/NewsApp")
.then(()=> {
    console.log("mongodb connected")
})

// for firebase img db
const firebaseConfig = {
    apiKey: "AIzaSyA93ltZGUFMyo_1KVRJKgdT5_7mWEF4E1A",
    authDomain: "blogs-e1760.firebaseapp.com",
    projectId: "blogs-e1760",
    storageBucket: "blogs-e1760.appspot.com",
    messagingSenderId: "890764782933",
    appId: "1:890764782933:web:e51d77c582cf9281e7d3dc",
    measurementId: "G-QKXNVHBJCC" 
  };
  
// user schema
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String
})
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

const User = mongoose.model("user",userSchema);

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    img: String
})

const Blog = mongoose.model("blog",blogSchema); 

module.exports = {User, storage, Blog }; 