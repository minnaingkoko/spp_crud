const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

  //Basic Data
  name: { type: String, required: true },
  passportNo: { type: String, unique: true, required: true },
  passportType: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  dobString: { type: String, required: true },
  age: { type: Number, required: true },
  ppIssueDate: { type: String, required: true },
  ppIssueDateString: { type: String, required: true },
  ppExpireDate: { type: String, required: true },
  ppExpireDateString: { type: String, required: true },
  pob: { type: String, required: true },
  authority: { type: String, required: true },

  //More Data
  fatherName: { type: String },
  motherName: { type: String },
  address: { type: String },
  nrcNo: { type: String, unique: true },
  phNo: { type: String },
  agent: { type: String },
  companyName: { type: String },
  airPlaneNo: { type: String },
  departureDate: { type: String },
  departureDateString: { type: String },
});

module.exports = mongoose.model('Employee', employeeSchema);

