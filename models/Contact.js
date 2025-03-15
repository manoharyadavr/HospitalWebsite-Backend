const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now } // ✅ Auto timestamp
});

module.exports = mongoose.model("Contact", ContactSchema);
