// backend/seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("./models/Event");
const User = require("./models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const seedEvents = async () => {
  try {
    // Koi ek organizer user lo
    const organizer = await User.findOne({ role: "organizer" });
    if (!organizer) {
      console.log("⚠️ Organizer user nahi mila. Pehle ek organizer register karo.");
      process.exit();
    }

    // Purane events delete kar do
    await Event.deleteMany();

    // 20 dummy events
    const events = Array.from({ length: 20 }, (_, i) => ({
      title: `Event ${i + 1}`,
      description: `This is the description for event ${i + 1}`,
      date: new Date(2025, 8, i + 1), // September ke dates
      location: `Location ${i + 1}`,
      isPaid: i % 2 === 0, // alternate free/paid
      price: i % 2 === 0 ? 100 + i * 10 : 0,
      organizer: organizer._id,
    }));

    await Event.insertMany(events);

    console.log("✅ 20 dummy events added successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedEvents();
