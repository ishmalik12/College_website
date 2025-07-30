const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const GalleryImage = require("../models/GalleryImage");
const auth = require("../middleware/auth");
const upload = require('../middleware/upload');
const router = express.Router();


// Upload Image
router.post("/upload",auth, upload.single("image"), async (req, res) => {
  const { title, category } = req.body;
  const imageUrl = `/uploads/facilities/${req.file.filename}`;
  const newImage = new GalleryImage({ title, category, imageUrl });
  await newImage.save();
  res.status(201).json(newImage);
});

// Get All Images
router.get("/", async (req, res) => {
  const images = await GalleryImage.find();
  res.json(images);
});

// Delete Image
router.delete("/:id",auth, async (req, res) => {
  const image = await GalleryImage.findById(req.params.id);
  if (!image) return res.status(404).json({ error: "Image not found" });

  const filePath = path.join(__dirname, "../", image.imageUrl);
  fs.unlink(filePath, () => {});

  await image.deleteOne();
  res.json({ message: "Image deleted" });
});

module.exports = router;
