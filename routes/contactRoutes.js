const express = require("express");
const appendToSheet = require("../googleSheets"); // ✅ Import Google Sheets function
const router = express.Router();

// ✅ Handle Contact Form Submission
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const contactData = [[name, email, message, new Date().toLocaleString()]];

    // ✅ Send data to Google Sheets (Sheet Name: "contact")
    await appendToSheet(contactData, "contact");

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Contact Form Error:", error.message);
    res.status(500).json({ error: "Server error. Try again later." });
  }
});

module.exports = router;
