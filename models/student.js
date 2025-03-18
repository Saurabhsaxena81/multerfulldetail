const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    trim: true, // Removes extra spaces
  },
  age: {
    type: Number,
    min: 0, // Ensures age is non-negative
  },
  email: {
    type: String,
    unique: true,
    required: true, // Ensure email is always provided
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,  // store base64 encoded data 
  },
});

// Create & export model
module.exports = mongoose.model("Student", studentSchema);
