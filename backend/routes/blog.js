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

const blogRouter = express.Router();

const zodvalidation = zod.object({
  title: zod.string(),
  description: zod.string(),
});

const upload = multer({ storage: multer.memoryStorage() });
const multiple = [Auth, upload.single("filename")];

// api for creating blog
// Optimized API for creating blog
blogRouter.post("/create_post", multiple, async (req, res) => {
  try {
    // Zod validation
    const body = req.body;
    const validationResult = zodvalidation.safeParse(body);
    if (!validationResult.success) {
      return res.status(400).json({ msg: "Invalid data" });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ msg: "File not uploaded" });
    }

    // Handle file upload and blog creation concurrently
    const dataTime = Date.now();
    const filename = `${req.file.originalname}-${dataTime}`;
    const storageRef = ref(storage, `ECommerce/${filename}`);

    // Firebase upload metadata
    const metadata = { contentType: req.file.mimetype };

    // Start file upload
    const uploadTask = uploadBytesResumable(storageRef, req.file.buffer, metadata);

    // Fetch author details in parallel
    const authorPromise = User.findById(req.userId);

    // Wait for upload to complete and get the download URL
    const [snapshot, author] = await Promise.all([uploadTask, authorPromise]);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Save blog post to the database
    await Blog.create({
      title: body.title,
      description: body.description,
      img: downloadURL,
      date: Date.now(),
      userId: req.userId,
      authorName: author.firstname,
    });

    return res.json({ msg: "Upload successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
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
