const { remove } = require("./bookingController");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const express = require("express");
const User = require("../models/User");
const Booking = require("../models/Booking");
const router = express.Router();

//! show profile (with booking)
const showProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Find all the bookings from the specific user by ascending order
    const allBookings = await Booking.find({ user: userId }).sort({
      booking_date: 1,
    });

    // get the current time down to milliseconds
    const today = new Date();
    const upcomingBookings = allBookings.filter(
      (booking) => new Date(booking.booking_date) > today
    );
    const pastBookings = allBookings.filter(
      (booking) => new Date(booking.booking_date) <= today
    );

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
const updateProfile = async (req, res) => {};

//! delete booking
const deleteBooking = remove;

router.get("/:userId", isLoggedIn, showProfile);
router.put("/:userId/edit", isLoggedIn, updateProfile);
router.delete("/:userId", isLoggedIn, deleteBooking);

module.exports = router;
