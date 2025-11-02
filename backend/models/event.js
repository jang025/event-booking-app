const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const eventSchema = new mongoose.Schema(
  {
    long_title: { type: String, trim: true, required: true },
    short_title: { type: String, trim: true, required: true },
    event_image: [{ type: String, trim: true }],
    category: {
      type: String,
      enum: [
        "Arts & Culture",
        "Food & Drink",
        "Business & Networking",
        "LifeStyle",
        "Health",
        "Community",
      ],
      trim: true,
    },
    start_date_time: { type: Date, required: true },
    end_date_time: { type: Date, required: true },
    venue: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    organisation: {
      name: { type: String, trim: true },
      description: { type: String, trim: true },
      image: { type: String, trim: true },
      contact_person_name: { type: String, trim: true },
      contact_person_email: { type: String, trim: true },
    },
    event_short_description: { type: String, trim: true },
    event_long_description: { type: String, trim: true },
    tiers: [
      {
        tierName: { type: String, trim: true, required: true },
        unitPrice: { type: Number, required: true, min: 0 },
        capacity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

const Event = model("Event", eventSchema);

module.exports = Event;
