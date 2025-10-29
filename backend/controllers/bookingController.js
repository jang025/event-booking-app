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
<<<<<<< HEAD
=======

    // Add booking ID to the user's "bookings" array
    await User.findByIdAndUpdate(userId, {
      $push: { bookings: newBooking._id },
    });

    // Reduce the capacity of event tiers
    const event = await Event.findById(eventId);
    if (event) {
      items.forEach((item) => {
        const tier = event.tiers.find((t) => t.tierName === item.tierName);
        if (tier) {
          tier.capacity -= item.quantity;
        }
      });
      await event.save();
    }

>>>>>>> jeremy
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

    // Remove booking ID from user's "bookings" array
    await User.findByIdAndUpdate(deleted.userId, {
      $pull: { bookings: deleted._id },
    });

    // Restore event tier capacities
    const event = await Event.findById(deleted.eventId);
    if (event) {
      deleted.items.forEach((item) => {
        const tier = event.tiers.find((t) => t.tierName === item.tierName);
        if (tier) {
          tier.capacity += item.quantity; // restore capacity
        }
      });
      await event.save();
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

module.exports = { router, show, create, remove };
