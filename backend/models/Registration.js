const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  name: String,
  email: String,
  phone: String,
  cnic: String,
  city: String,
  education: String,
  gender: String,
  notes: String,
  ticketNumber: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-generate ticket number
RegistrationSchema.pre("save", function (next) {
  if (!this.ticketNumber) {
    this.ticketNumber =
      "TKT-" + Math.random().toString(36).substring(2, 10).toUpperCase();
  }
  next();
});

module.exports = mongoose.model("Registration", RegistrationSchema);
