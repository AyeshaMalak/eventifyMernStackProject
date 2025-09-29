const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const registrationsRoute = require("./routes/registrations");
const eventRegistrations = require("./routes/eventRegistrations");
const adminRoutes = require("./routes/admin");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
//Cors
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes); // Register/Login
app.use("/api/events", eventRoutes); // Public + CRUD events
app.use("/api/registrations", registrationsRoute); // User registrations
app.use("/api/event-registrations", eventRegistrations); // Event-wise registrations
app.use("/api/admin", adminRoutes); // Admin-specific routes

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
