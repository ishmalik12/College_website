const mongoose = require("mongoose");

const galleryImageSchema = new mongoose.Schema({
  category: String,
  title: String,
  imageUrl: String,
});

module.exports = mongoose.model("GalleryImage", galleryImageSchema);
