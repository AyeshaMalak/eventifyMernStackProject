const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const auth = require("../middleware/auth");

// User registers for an event
router.post("/:eventId", auth, async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Check if user already registered
    const existing = await Registration.findOne({ event: eventId, user: req.user._id });
    if (existing) return res.status(400).json({ msg: "You already registered for this event" });

    // Create new registration
    const registration = new Registration({
      event: eventId,
      user: req.user._id
    });
    await registration.save();

    res.status(201).json({ msg: "Registration successful", ticket: registration.ticketNumber });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Organizer/Admin view all registrations for an event
router.get("/:eventId", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    // Only organizer or admin can see registrations
    if (event.organizer.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const registrations = await Registration.find({ event: req.params.eventId })
      .populate("user", "name email");

    res.json({
      event: event.title,
      totalRegistrations: registrations.length,
      users: registrations
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
