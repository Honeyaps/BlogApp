// const express = require("express");
// const cors = require("cors");
// const userRouter = require("./routes/user");
// const blogRouter = require("./routes/blog");
// const app = express();

// app.use(cors({
//   origin: "*",  
//   methods: ["GET","HEAD","PUT","PATCH","POST","DELETE","OPTIONS"], 
//   credentials: true,
//   allowedHeaders: "Content-Type, Authorization"  
// }));

// app.options('*', cors());  

// // Body parser middleware
// app.use(express.json());

// // for registration
// app.use("/user", userRouter);

// // for create a blog
// app.use("/blog", blogRouter);

// router.get('/', (req, res) => {
//   res.send('User route works!');
// });

// app.listen(4500, () => {
//   console.log("port connected");
// });



const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const app = express();

// CORS setup (adjust allowed origins for production)
const allowedOrigins = ['https://blogger-api-kappa.vercel.app'];
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: "Content-Type, Authorization"
}));

app.options('*', cors());  // Pre-flight requests for CORS

// Body parser middleware
app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/blog", blogRouter);

// Error handling middleware (optional, for better debugging in production)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log errors for debugging
  res.status(500).send('Something went wrong!');
});

// Server setup
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

