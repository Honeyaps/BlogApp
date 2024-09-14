const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const app = express();

app.use(cors({
  origin: "https://bloggers-kappa.vercel.app",  // Allow requests only from your frontend domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",  // Include OPTIONS for preflight requests
  credentials: true,  // If you're using cookies or auth headers
  allowedHeaders: "Content-Type, Authorization"  // Add headers your client might be sending
}));

// Automatically handle preflight requests
app.options('*', cors());  // This responds to preflight requests (OPTIONS)

// Body parser middleware
app.use(express.json());

// for registration
app.use("/user", userRouter);

// for create a blog
app.use("/blog", blogRouter);

app.listen(4500, () => {
  console.log("port connected");
});

