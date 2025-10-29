const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Event = require("../models/Event");
const User = require("../models/User");

// Show a booking
const show = async (req, res) => {
  const { bookingId } = req.params;

  const book = await Booking.findById(bookingId);
  if (!book) {
    return res.status(404).json({ msg: "No booking found" });
  }

  return res.status(200).json(book);
};

// Create a new booking
const create = async (req, res) => {
  try {
    const { userId, eventId, items, status, booking_date } = req.body;

    // Create booking
    const newBooking = await Booking.create({
      userId,
      eventId,
      items,
      status,
      booking_date,
    });
    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating booking" });
  }
};

// Delete a booking
const remove = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const Cancelled = await Booking.findByIdAndUpdate(bookingId, { status: "cancelled" }, { new: true });
    if (!Cancelled) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    res.status(200).json({
      msg: "Booking Cancelled successfully",
      bookingId: Cancelled._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting booking" });
  }
};


const showevent = async (req, res) => {
    const { eventId } = req.params;
    try {
      const events = await Event.findById(eventId);
      if (!events) {
        return res.status(404).json({ msg: "No event found" });
      }
      return res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching event" });
    }
  }

// Routes
router.post("/", create);
router.get("/:bookingId", show);
router.delete("/:bookingId", remove);
router.get("/event/:eventId", showevent);

module.exports = router;
