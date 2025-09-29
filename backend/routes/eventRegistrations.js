const express = require("express");
const Registration = require("../models/Registration");
const router = express.Router();
const PDFDocument = require("pdfkit");

// ➡️ Create new registration
router.post("/", async (req, res) => {
  try {
    const {
      eventId,
      name,
      email,
      phone,
      cnic,
      city,
      education,
      gender,
      notes,
    } = req.body;

    if (!eventId || !name || !email) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const registration = new Registration({
      eventId,
      name,
      email,
      phone,
      cnic,
      city,
      education,
      gender,
      notes,
    });

    await registration.save();

    const event = await registration.populate("eventId", "title");

    res.json({
      msg: `✅ Successfully registered for event: ${event.eventId.title}`,
      registration,
    });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res
      .status(500)
      .json({ msg: "Error saving registration", error: err.message });
  }
});

// ➡️ Get all registrations
router.get("/", async (req, res) => {
  try {
    const regs = await Registration.find().populate(
      "eventId",
      "title date location"
    );
    res.json(regs);
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    res
      .status(500)
      .json({ msg: "Error fetching registrations", error: err.message });
  }
});
router.get("/ticket/:registrationId", async (req, res) => {
  try {
    const registration = await Registration.findById(
      req.params.registrationId
    ).populate("eventId", "title date location");

    if (!registration)
      return res.status(404).json({ msg: "Registration not found" });

    const doc = new PDFDocument({ size: "A5", margin: 40 });
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, {
          "Content-Length": pdfData.length,
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment;filename=ticket-${registration.ticketNumber}.pdf`,
        })
        .end(pdfData);
    });

    // Header
    doc.rect(0, 0, doc.page.width, 60).fill("#0d9488");
    doc.fillColor("white").fontSize(22).font("Helvetica-Bold")
      .text("EVENT TICKET", 0, 20, { align: "center" });

    doc.moveDown(2);

    // Ticket Number Box
    doc.fillColor("#f0fdf4")
      .rect(doc.x, doc.y, doc.page.width - 80, 28)
      .fill();
    doc.fillColor("#065f46")
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(`Ticket Number: ${registration.ticketNumber}`, doc.x + 10, doc.y + 6);

    doc.moveDown(3);

    // Ticket Details Box
    const boxHeight = 150;
    doc.rect(doc.x, doc.y, doc.page.width - 80, boxHeight).fill("#f9fafb").stroke("#e5e7eb");

    const startY = doc.y + 10;
    const labelX = doc.x + 10;
    const valueX = labelX + 100;

    doc.font("Helvetica-Bold").fontSize(12).fillColor("black");
    doc.text("Name:", labelX, startY);
    doc.font("Helvetica").text(registration.name, valueX, startY);

    doc.font("Helvetica-Bold").text("Email:", labelX, startY + 25);
    doc.font("Helvetica").text(registration.email, valueX, startY + 25);

    doc.font("Helvetica-Bold").text("Event:", labelX, startY + 50);
    doc.font("Helvetica").text(registration.eventId.title, valueX, startY + 50);

    doc.font("Helvetica-Bold").text("Date:", labelX, startY + 75);
    doc.font("Helvetica").text(
      new Date(registration.eventId.date).toLocaleString(),
      valueX,
      startY + 75
    );

    doc.font("Helvetica-Bold").text("Location:", labelX, startY + 100);
    doc.font("Helvetica").text(registration.eventId.location, valueX, startY + 100);

    // Footer Note
    doc.moveDown(9);
    doc.fontSize(10).fillColor("gray")
      .text("Please bring this ticket to the event entrance. Thank you!", { align: "center" });

    doc.end();
  } catch (err) {
    console.error("❌ Ticket Error:", err);
    res.status(500).json({ msg: "Error generating ticket", error: err.message });
  }
});


module.exports = router;
