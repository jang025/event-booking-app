const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const bookingSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    items: [
      {
        tierName: { type: String, trim: true, required: true },
        unitPrice: { type: Number, required: true, min: 0 },
        quantity: { type: Number, required: true, min: 1 },
        totalCost: { type: Number, required: true, min: 0 },
      },
    ],
    status: {
      type: String,
      trim: true,
      enum: ["confirmed", "cancelled"],
      required: true,
    },
    booking_date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Booking = model("Booking", bookingSchema);

module.exports = Booking;
