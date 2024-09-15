const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const app = express();


app.use(cors({
  origin: ['https://blogger-api-kappa.vercel.app'],  
  methods: ["GET","POST","DELETE"], 
  credentials: true,
  allowedHeaders: "Content-Type, Authorization"  
}));

app.use(express.json());

app.use("/user", userRouter);

app.use("/blog", blogRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(4500, () => {
  console.log("port connected");
});


