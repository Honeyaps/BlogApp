const express = require("express");
const cors = require("cors");
const mainRouter = require("./mainRouter");
const app = express();


app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "DELETE", "PUT"], 
  credentials: true,
  allowedHeaders: "Content-Type, Authorization"  
}));

app.use(express.json());

app.use("/v1", mainRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(4500, () => {
  console.log("port connected");
});


