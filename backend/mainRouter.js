const express = require("express");
const userRouter = require("./routes/user");  
const blogRouter = require("./routes/blog");  

const mainRouter = express.Router();

// Use sub-routers under mainRouter
mainRouter.use("/user", userRouter);  
mainRouter.use("/blog", blogRouter);  

module.exports = mainRouter;
