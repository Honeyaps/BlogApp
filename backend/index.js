const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.listen(4500, () => {
  console.log("port connected");
});


