const express = require("express");
const zod = require("zod");

const { storage, Blog, User } = require("../db");
const multer = require("multer");
const {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const Auth = require("../middleware/auth");

require("dotenv").config();
const blogRouter = express.Router();
const zodvalidation = zod.object({
  title: zod.string(),
  description: zod.string(),
});

const upload = multer({ storage: multer.memoryStorage() });
const multiple = [Auth, upload.single("filename")];

// api for creating blog
blogRouter.post("/create_post", multiple, async (req, res) => {
  const body = req.body;
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

    const author = await User.findById(req.userId);
  

    const blog = await Blog.create({
      title: body.title,
      description: body.description,
      img: downloadURL,
      date: Date.now(),
      userId: req.userId,
      authorName: author.firstname,
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

// api for deleting user blogs
blogRouter.delete("/deleteblog", Auth,async (req, res) => {
  const body = req.body;
  try {
    const check = await Blog.findById(req.id);

    if (check) {
      res.status(403).json({ msg: "Deleting error" });
    }
    const response = await Blog.deleteOne({
      _id: body.id,
    });
    res.json({ msg: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Blog not deleted" });
  }
});

module.exports = blogRouter;
