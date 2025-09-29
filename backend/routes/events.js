const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Registration = require("../models/Registration");

// ------------------ Get all events ------------------
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ success: false, msg: "Failed to fetch events", error: err.message });
  }
});

// ------------------ Create event ------------------
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.json({ success: true, msg: "Event created successfully", event });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Failed to create event", error: err.message });
  }
});

// ------------------ Update event ------------------
router.put("/:id", async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, msg: "Event not found" });
    res.json({ success: true, msg: "Event updated successfully", event: updated });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Failed to update event", error: err.message });
  }
});

// ------------------ Delete event ------------------
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, msg: "Event not found" });
    res.json({ success: true, msg: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Failed to delete event", error: err.message });
  }
});

// ------------------ Get registrations for an event ------------------
router.get("/:id/registrations", async (req, res) => {
  try {
    const regs = await Registration.find({ eventId: req.params.id });
    res.json({ success: true, registrations: regs });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Failed to fetch registrations", error: err.message });
  }
});

module.exports = router;
