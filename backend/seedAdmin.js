// seedAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config(); // load .env

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Delete existing admin (optional, for fresh start)
    await User.deleteOne({ email: "admin@example.com" });

    // Hash password
    const hashed = await bcrypt.hash("Admin@123", 10);

    // Create admin user
    const admin = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: hashed, // ✅ use hashed
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin created successfully");

    process.exit();
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
    process.exit(1);
  }
}

seedAdmin();
