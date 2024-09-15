const express = require("express");
const userRouter = require("./routes/user");  // Import user routes
const blogRouter = require("./routes/blog");  // Import blog routes

// Create a main router
const mainRouter = express.Router();

// Use sub-routers under mainRouter
mainRouter.use("/user", userRouter);  // All user-related routes under /v1/user
mainRouter.use("/blog", blogRouter);  // All blog-related routes under /v1/blog

// Export the main router
module.exports = mainRouter;
