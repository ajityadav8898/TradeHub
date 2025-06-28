const mongoose = require("mongoose");

const ebookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true }, // URL string for the thumbnail image
  pdf: { type: String, required: true }, // Base64 string for the PDF file
});

module.exports = mongoose.model("Ebook", ebookSchema);