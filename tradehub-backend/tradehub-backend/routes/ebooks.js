const express = require("express");
const multer = require("multer");
const Ebook = require("../models/Ebook");
const router = express.Router();

// Multer setup for memory storage (no local files, only for PDF)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📌 GET all ebooks
router.get("/", async (req, res) => {
  try {
    const ebooks = await Ebook.find();
    res.json(ebooks);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// 📌 POST - Upload a new ebook (Admin Only)
router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const { title, thumbnail } = req.body; // Get thumbnail as URL from body
    const pdfBase64 = req.file.buffer.toString("base64"); // Convert PDF to Base64

    if (!title || !thumbnail || !req.file) {
      return res.status(400).json({ error: "All fields (title, thumbnail URL, and PDF) are required!" });
    }

    const newEbook = new Ebook({
      title,
      thumbnail, // Store as URL string
      pdf: pdfBase64, // Store PDF as Base64
    });
    await newEbook.save();

    // Log only the PDF filename (extracted from the original filename)
    const pdfFilename = req.file.originalname;
    console.log(`Ebook added: ${pdfFilename}`);
    res.status(201).json({ message: "Ebook uploaded successfully", ebook: newEbook });
  } catch (error) {
    console.error("Error uploading ebook:", error);
    res.status(500).json({ error: "Error uploading ebook" });
  }
});

// 📌 GET - Serve thumbnail by ID (no need to convert, it’s a URL)
router.get("/:id/thumbnail", async (req, res) => {
  try {
    const ebook = await Ebook.findById(req.params.id);
    if (!ebook) return res.status(404).json({ error: "Ebook not found" });

    res.redirect(ebook.thumbnail); // Redirect to the thumbnail URL
  } catch (error) {
    console.error("Error fetching thumbnail:", error);
    res.status(500).json({ error: "Error fetching thumbnail" });
  }
});

// 📌 GET - Serve PDF by ID
router.get("/:id/pdf", async (req, res) => {
  try {
    const ebook = await Ebook.findById(req.params.id);
    if (!ebook) return res.status(404).json({ error: "Ebook not found" });

    const pdfBuffer = Buffer.from(ebook.pdf, "base64");
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error fetching PDF:", error);
    res.status(500).json({ error: "Error fetching PDF" });
  }
});

// 📌 DELETE - Remove an ebook by ID (Admin Only)
router.delete("/:id", async (req, res) => {
  try {
    const ebook = await Ebook.findById(req.params.id);
    if (!ebook) return res.status(404).json({ error: "Ebook not found" });

    await Ebook.findByIdAndDelete(req.params.id);

    // Log only the PDF filename (extracted from the ebook data)
    const pdfFilename = ebook.pdf.split(",")[0]; // Simple extraction (may need adjustment based on actual data)
    console.log(`Ebook deleted: ${pdfFilename}`);
    res.json({ message: "Ebook deleted successfully" });
  } catch (error) {
    console.error("Error deleting ebook:", error);
    res.status(500).json({ error: "Error deleting ebook" });
  }
});

module.exports = router;