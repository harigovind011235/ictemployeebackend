const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  phonenumber: Number,
  location: String,
  bloodgroup: String,
  date_of_joining: Date,
  active: Boolean,
  updated: { type: Date, default: Date.now },
  age: { type: Number, min: 21, max: 60 },
  skills: [],
  position:String,
  officelocation:String,
  salary:Number
});

const employeeModel = mongoose.model("Employees", employeeSchema);
module.exports = { employeeModel };
