// connection
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://honeyaps12345:L2oux0cQoRO8yBaN@cluster0.pc9z2.mongodb.net/NewsApp?retryWrites=true&w=majority&appName=Cluster0").then(() => {
  console.log("mongodb connected");
});

// for firebase img db
const firebaseConfig = {
  apiKey: "AIzaSyA93ltZGUFMyo_1KVRJKgdT5_7mWEF4E1A",
  authDomain: "blogs-e1760.firebaseapp.com",
  projectId: "blogs-e1760",
  storageBucket: "blogs-e1760.appspot.com",
  messagingSenderId: "890764782933",
  appId: "1:890764782933:web:e51d77c582cf9281e7d3dc",
  measurementId: "G-QKXNVHBJCC",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// user schema
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("user", userSchema);

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  img: String,
  date: Date,
  userId: String,
  authorName: String
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = { User, storage, Blog };
