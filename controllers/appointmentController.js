const Appointment = require("../models/Appointment");
const appendToSheet = require("../googleSheets");

const createAppointment = async (req, res) => {
  const { name, email, phone, date, doctor } = req.body;

  try {
    // Save to MongoDB
    const newAppointment = new Appointment({ name, email, phone, date, doctor });
    await newAppointment.save();

    // Save to Google Sheets
    await appendToSheet([name, email, phone, date, doctor]);

    res.status(201).json({ message: "Appointment created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createAppointment };