const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const app = express();

app.use(cors({
  origin: "*",  
  methods: ["GET","HEAD","PUT","PATCH","POST","DELETE","OPTIONS"], 
  credentials: true,
  allowedHeaders: "Content-Type, Authorization"  
}));

app.options('*', cors());  

// Body parser middleware
app.use(express.json());

// for registration
app.use("/user", userRouter);

// for create a blog
app.use("/blog", blogRouter);

router.get('/', (req, res) => {
  res.send('User route works!');
});

app.listen(4500, () => {
  console.log("port connected");
});

