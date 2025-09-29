const express = require("express");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

const router = express.Router();

// ➡️ Get all events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching events", error: err.message });
  }
});

// ➡️ Create event
router.post("/events", async (req, res) => {
  try {
    const { title, location, date, description, isPaid } = req.body;
    const event = new Event({ title, location, date, description, isPaid });
    await event.save();
    res.json({ msg: "Event created", event });
  } catch (err) {
    res.status(500).json({ msg: "Error creating event", error: err.message });
  }
});

// ➡️ Update event
router.put("/events/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ msg: "Event not found" });
    res.json({ msg: "Event updated", event });
  } catch (err) {
    res.status(500).json({ msg: "Error updating event", error: err.message });
  }
});

// ➡️ Delete event
router.delete("/events/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ msg: "Event deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting event", error: err.message });
  }
});

// Get all events with registrations
router.get("/events-with-registrations", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });

    const eventsWithRegs = await Promise.all(
      events.map(async (ev) => {
        const regs = await Registration.find({ eventId: ev._id });
        return { ...ev.toObject(), registrations: regs };
      })
    );

    res.json(eventsWithRegs);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching events", error: err.message });
  }
});;

module.exports = router;
