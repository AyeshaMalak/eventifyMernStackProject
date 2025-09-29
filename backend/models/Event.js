// models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  isPaid: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
    image: { type: String, default: "" },
});

module.exports = mongoose.model("Event", eventSchema);
