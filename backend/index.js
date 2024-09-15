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

app.post("/signin", async (req, res) => {
  const body = req.body;
  const success = sigupValidation.safeParse(body);

  if (!success) {
    return res.status(403).json({ msg: "data is not valid" });
  }

  try {
    const checks = await User.findOne({
      email: body.email,
    });

    if (!checks) {
      return res.status(403).json({ msg: "enter correct email" });
    }

    const passCmpr = await bcrypt.compare(body.password, checks.password);
    if (passCmpr) {
      const token = jwt.sign(checks._id.toHexString(), process.env.SECRET);

      return res.json({
        name: checks.firstname,
        token: token
      });
    } else {
      return res.status(403).json({ msg: "incorrect password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: "error while signing in" });
  }
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(4500, () => {
  console.log("port connected");
});


