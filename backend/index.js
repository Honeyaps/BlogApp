const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog")
const app = express();

app.use(cors());
app.use(express.json());

// for registration
app.use("/user", userRouter);

// for create a blog
app.use("/blog", blogRouter);



app.listen(4500, () => {
  console.log("port connected");
});


