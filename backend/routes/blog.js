const express = require("express");
const zod = require("zod");

const {storage} = require("../db");
const multer = require("multer");
const {Blog} = require("../db");
const {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

require("dotenv").config();
const blogRouter = express.Router();

const zodvalidation = zod.object({
  title: zod.string(),
  description: zod.string(),
});

const upload = multer({ storage: multer.memoryStorage() });

// api for creating blog
blogRouter.post("/create_post", upload.single("filename"), async (req, res) => {
  const body = req.body;
  console.log(body)
  if (!req.file) {
    console.log("file not uploaded");
  }
  const success = zodvalidation.safeParse(body);
  if (!success) {
    return res.status(403).json({ msg: "invalid data" });
  }

  try {
    const dataTime = Date.now();
    const storageRef = ref(storage, `ECommerce/${req.file.originalname + " " + dataTime}`); 
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
    });

    return res.json({
      msg: "uploading done",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ msg: "uploading error" });
  }
});

module.exports = blogRouter;
