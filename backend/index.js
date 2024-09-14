const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const app = express();

// app.use(cors({
//   AccessControlAllowOrigin: req.headers.origin,
//       AccessControlAllowHeaders: "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name, Origin",
//       AccessControlAllowMethods: "POST, GET, PUT, DELETE, OPTIONS",
//       AccessControlAllowCredentials: "true",
// }));

app.use(function (req, res, next) {
  var responseSettings = {
    AccessControlAllowOrigin: req.headers.origin,
    AccessControlAllowHeaders: "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name, Origin",
    AccessControlAllowMethods: "POST, GET, PUT, DELETE, OPTIONS",
    AccessControlAllowCredentials: "true",
  };

  res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
  res.header("Access-Control-Allow-Origin", responseSettings.AccessControlAllowOrigin);
  res.header("Access-Control-Allow-Headers", req.headers["access-control-request-headers"] ? req.headers["access-control-request-headers"] : "x-requested-with");
  res.header("Access-Control-Allow-Methods", req.headers["access-control-request-method"] ? req.headers["access-control-request-method"] : responseSettings.AccessControlAllowMethods);
  if ("OPTIONS" == req.method) {
    res.sendStatus(200).end();
  } else {
    next();
  }
});



app.use(express.json());

// for registration
app.use("/user", userRouter);

// for create a blog
app.use("/blog", blogRouter);

app.listen(4500, () => {
  console.log("port connected");
});

