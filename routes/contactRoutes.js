const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact"); // ✅ Import Contact Model
const { appendToSheet } = require("../googleSheets"); // ✅ Import Google Sheets function

// ✅ POST: Save Contact Form Submission & Send to Google Sheets
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // ✅ Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log("✅ Saved to MongoDB:", newContact);

    // ✅ Send Data to Google Sheets
    const sheetData = [[name, email, message, new Date().toISOString()]];
    try {
      await appendToSheet(sheetData, "contact");
      console.log("✅ Contact data added to Google Sheets:", sheetData);
    } catch (sheetError) {
      console.error("❌ Google Sheets API Error:", sheetError);
    }

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Contact Form Error:", error.message);
    res.status(500).json({ error: "Server error. Try again later." });
  }
});

// ✅ GET: Retrieve all contact messages
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find(); // Fetch all messages
    res.status(200).json(contacts);
  } catch (error) {
    console.error("❌ Fetch Contact Error:", error.message);
    res.status(500).json({ error: "Server error. Try again later." });
  }
});

module.exports = router;
