const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

//filter, search, fetch events
router.get("/eventlist", async (req, res) => {
  try {
    const { category, search, sort } = req.query;

    let filter = {};
    let sortOption = {};

    if (category && category !== "All") {
      //if filter category chosen is not 'All",
      filter.category = category; //only return those events
    }

    if (search) {
      filter.$or = [
        //$or means “match any of these fields.”
        { long_title: { $regex: search, $options: "i" } }, //$options: "i" makes it case-insensitive
        { short_title: { $regex: search, $options: "i" } }, //$regex lets you do partial text matching
        { venue: { $regex: search, $options: "i" } },
      ];
    }

    if (sort === "date") {
      sortOption = { start_date_time: 1 }; // ascending by date
    } else if (sort === "priceLow") {
      sortOption = { "tiers.unitPrice": 1 }; // ascending by price
    } else if (sort === "priceHigh") {
      sortOption = { "tiers.unitPrice": -1 }; // descending by price
    }

    const events = await Event.find(filter).sort(sortOption);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//create a new event
router.post("/eventlist", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
    return;
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get single event by ID
router.get("/:eventId", async (req, res) => {
  const { eventId } = req.params; //extracts eventId from the URL
  try {
    const events = await Event.findById(eventId); //searches MongoDB by _id
    if (!events) {
      return res.status(404).json({ msg: "No event found" });
    }
    return res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching event" });
  }
});

module.exports = router;
