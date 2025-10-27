const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, trim: true, minLength: 3 },
  password: { type: String, trim: true, minLength: 3 },
  age: { type: Number, min: 0 },
});

userSchema.set("toJSON", {
  transform: (_doc, returnedObject) => {
    delete returnedObject.password;
  },
});

const User = model("User", userSchema);

module.exports = User;
