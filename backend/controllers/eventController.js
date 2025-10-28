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

router.get("/eventlist", show);
router.post("/eventlist", create);

module.exports = router;
