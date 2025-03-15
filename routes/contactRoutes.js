const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact"); // ✅ Import Contact Model

// ✅ POST: Save Contact Form Submission
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // ✅ Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

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
