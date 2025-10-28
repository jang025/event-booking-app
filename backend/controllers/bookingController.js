//booking controllers
const express = require("express");
const router = express.Router();
const Booking= require("../models/Booking");
// const Event = require("../models/Event");
// const User = require("../models/User");

const show = async (req, res) => {
    const { bookingId } = req.params;
  const book = await Booking.findById(bookingId);

  if (book === null) {
    return res.status(401).json({ msg: "No booking found" });
  }
  return res.status(201).json(book);
};
const create = async (req, res) => {
    const { userId, eventId, items, status, booking_date } = req.body;
  
    try {
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
      res.status(500).json({ error });
    }
  };

  const remove = async (req, res) => {
    const { bookingId } = req.params;
    try {
      const deleted = await Booking.findByIdAndDelete(bookingId);
      if (!deleted) {
        return res.status(404).json({ msg: "Booking not found" });
      }
      res.json({ msg: "Booking deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  };
  

router.post('/book',create)
router.get("/book/:bookingId", show);
router.delete("/book/:bookingId",remove);


module.exports = router;
