const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },  // ✅ Match frontend
    reason: { type: String, required: true } // ✅ Match frontend
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
