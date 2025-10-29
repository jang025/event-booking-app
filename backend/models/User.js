const mongoose = require("mongoose");
// This library validates and sanitizes strings only
const validator = require("validator");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email address",
      },
    },
  },

  {
    timestamps: true,
  }
);

//! Before sending this document to the client, remove the password field
userSchema.set("toJSON", {
  transform: (_doc, returnedObject) => {
    delete returnedObject.password;
  },
});

const User = model("User", userSchema);

module.exports = User;
