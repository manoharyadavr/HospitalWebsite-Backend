const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const { appendToSheet } = require("../googleSheets"); // ✅ Fix import

// ✅ GET Route - Fetch All Appointments
router.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        console.error("❌ Error fetching appointments:", error);
        res.status(500).json({ error: "Error fetching appointments" });
    }
});

// ✅ POST Route - Save to MongoDB & Google Sheets
router.post("/", async (req, res) => {
    console.log("📥 Received Data:", req.body);

    try {
        const { name, email, phone, date, time, reason } = req.body;

        // ✅ Check for missing fields
        if (!name || !email || !phone || !date || !time || !reason) {
            console.error("❌ Missing fields:", req.body);
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Save appointment to MongoDB
        const newAppointment = new Appointment({ name, email, phone, date, time, reason });
        await newAppointment.save();
        console.log("✅ Saved to MongoDB:", newAppointment);

        // ✅ Prepare data for Google Sheets
        const sheetData = [[name, email, phone, date, time, reason]];

        // ✅ Send to Google Sheets (Prevent Crashes)
        try {
            await appendToSheet(sheetData, "appointment"); // Fix the function call
            console.log("✅ Appointment added to Google Sheets:", sheetData);
        } catch (sheetError) {
            console.error("❌ Google Sheets API Error:", sheetError);
        }

        res.status(201).json({ message: "Appointment booked & saved in Google Sheets!" });
    } catch (error) {
        console.error("❌ Backend Error:", error);
        res.status(500).json({ error: "Error booking appointment" });
    }
});

module.exports = router;
