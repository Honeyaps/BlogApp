const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {User} = require("../db");

require("dotenv").config();
const userRouter = express.Router();

const sigupValidation = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
});

// for signup
userRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const success = sigupValidation.safeParse(body);
  console.log(body)

  if (!success) {
    return res.status(403).json({ msg: "data is not valid" });
  }
  
  const salt =await bcrypt.genSalt(10);
  const securePass =await bcrypt.hash(body.password, salt);

  const check = await User.findOne({
    email: body.email
  }) 

  if (check) {
    return res.status(403).json({ msg: "email already exist" });
  }
  try {
    const response = await User.create({
      firstname: body.firstname,
      lastname: body.lastname,
      username: body.username,
      email: body.email,
      password: securePass,
    });

    const token = jwt.sign(response._id.toHexString(), process.env.SECRET);

    return res.json({ 
      name: response.firstname,
      token: token
     });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: "error while signin up" });
  }
});

// signin api
userRouter.post("/signin", async (req, res) => {
  const body = req.body;
  const success = sigupValidation.safeParse(body);

  if (!success) {
    return res.status(403).json({ msg: "data is not valid" });
  }

  try {
    const checks = await User.findOne ({
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
    }
    else{
        return res.status(403).json({msg: "incorrect password"})
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: "error while signing in" });
  }
});

module.exports = userRouter;
