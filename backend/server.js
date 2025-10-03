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

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5174",  // local dev
  "https://eventify-mern-stack-project-9pyn.vercel.app" // deployed frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationsRoute);
app.use("/api/event-registrations", eventRegistrations);
app.use("/api/admin", adminRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
