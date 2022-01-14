const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const carSchema = new Schema({
  BRAND: { type: String, required: true },
  MODEL: { type: String, required: true },
  DEALER: { type: String, required: true },
  MIN_MILEAGE: { type: String,  require: true},
  MAX_MILEAGE: { type: String, require: true},
});

module.exports = model("Car", carSchema);