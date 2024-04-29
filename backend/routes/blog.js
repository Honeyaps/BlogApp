const express = require("express");
const zod = require("zod");

const { storage } = require("../db");
const multer = require("multer");
const { Blog } = require("../db");
const {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const  Auth  = require("../middleware/auth");

require("dotenv").config();
const blogRouter = express.Router();
const zodvalidation = zod.object({
  title: zod.string(),
  description: zod.string(),
});

const upload = multer({ storage: multer.memoryStorage() });
const multiple = [Auth, upload.single('filename')]
// api for creating blog
blogRouter.post("/create_post", multiple , async (req, res) => {
  const body = req.body;
  console.log(body);
  if (!req.file) {
    console.log("file not uploaded");
  }
  
  const success = zodvalidation.safeParse(body);
  if (!success) {
    return res.status(403).json({ msg: "invalid data" });
  }

  try {
    const dataTime = Date.now();
    const storageRef = ref(
      storage,
      `ECommerce/${req.file.originalname + " " + dataTime}`
    );
    const metadata = {
      contentType: req.file.mimetype,
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);

    const blog = await Blog.create({
      title: body.title,
      description: body.description,
      img: downloadURL,
      date: Date.now(),
      userId: req.userId
    });

    return res.json({
      msg: "uploading done",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ msg: "uploading error" });
  }
});

// api for read blogs
blogRouter.get("/getblog", async (req, res) => {
  try {
    const response = await Blog.find({});
    return res.json({
      blog: response,
    });
  } catch (error) {
    return res.status(403).json({ msg: "error while getting blogs" });
  }
});

// api for get userdata
// blogRouter.get("/userdata", async (req, res) => {
//   try {
//     const response = await Blog.find({
//       userId: req.userId
//     });
//     return res.json({
//       userIds: response,
//     });
//   } catch (error) {
//     return res.status(403).json({ msg: "error while getting blogs" });
//   }
// });

module.exports = blogRouter;
