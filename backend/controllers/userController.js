const { isLoggedIn } = require("../middleware/isLoggedIn");
const express = require("express");
const User = require("../models/User");
const Booking = require("../models/Booking");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

//! show profile (with booking)
const showProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Find all the bookings from the specific user by ascending order
    const allBookings = await Booking.find({ userId: userId })
      .sort({
        booking_date: 1,
      })
      .populate("eventId");

    const mapBooking = (booking) => ({
      _id: booking._id,
      eventName:
        booking.eventId?.title || booking.eventId?.long_title || "Event",
      location: booking.eventId?.location || "Unknown",
      booking_date: booking.booking_date,
      status: booking.status,
      items: booking.items,
    });
    // get the current time down to milliseconds
    const today = new Date();
    const upcomingBookings = allBookings
      .filter((booking) => new Date(booking.booking_date) > today)
      .map(mapBooking);
    const pastBookings = allBookings
      .filter((booking) => new Date(booking.booking_date) <= today)
      .map(mapBooking);

    res.status(200).json({
      msg: "User profile with bookings",
      user,
      upcomingBookings,
      pastBookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching profile" });
  }
};

//! update profile
const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { username, password, confirmPassword } = req.body;
  //get the authenticated user
  const currentUser = req.user;

  try {
    // currentUser._id is a Mongoose ObjectId
    if (userId !== String(currentUser._id)) {
      res.status(403).json({ msg: "Not authorised to update profile" });
      return;
    }

    // new username and password
    const updates = {};
    if (username) updates.username = username;

    // Update password only if it's being changed
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        res.status(400).json({ msg: "Passwords do not match" });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updates.password = hashedPassword;
    }

    // update user with new username and password
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    res.status(200).json({ msg: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error updating profile" });
  }
};

//! delete booking
const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    // cancel the booking
    const cancelled = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "cancelled" },
      { new: true }
    );
    if (!cancelled) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // Remove booking ID
    await User.findByIdAndUpdate(cancelled.userId, {
      $pull: { bookings: cancelled._id },
    });

    // Restore event tier capacities
    const event = await Event.findById(cancelled.eventId);
    if (event) {
      cancelled.items.forEach((item) => {
        const tier = event.tiers.find((t) => t.tierName === item.tierName);
        if (tier) {
          tier.capacity += item.quantity; // restore capacity
        }
      });
      await event.save();
    }

    res.status(200).json({
      msg: "Booking Cancelled successfully",
      bookingId: cancelled._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Cancelling booking" });
  }
};

router.get("/:userId", isLoggedIn, showProfile);
router.put("/:userId/edit", isLoggedIn, updateProfile);
router.delete("/bookings/:bookingId", isLoggedIn, deleteBooking);

module.exports = router;
