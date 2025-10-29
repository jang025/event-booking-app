const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

const show = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
    return;
  } catch (error) {
    res.status(400).json({ error: error.message });
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
};

router.get("/eventlist", show);
router.post("/eventlist", create);
router.get("/:eventId", showevent);

module.exports = router;
