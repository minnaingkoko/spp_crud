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
  deposit: { type: String },
  company: { type: String },
  airPlaneNo: { type: String },
  departureDate: { type: String },
  applyDate: { type: String },
  
  //Extra Data

  // religion: { type: String },
  // dobString: { type: String },
  // dobUpdate: { type: String },
  // age: { type: Number },
  // weight: { type: Number },
  // height: { type: Number },
  // marital: { type: String },
  // education: { type: String },
  // experience: { type: String },
  // workedCountry: { type: String },
  // spokenLanguage: { type: String },
  // passportExpireDate: { type: String },
  // medicalOnlineExpire: { type: String },
  // smartCardNo: { type: String },
  // vaccineData: {
  //   dose : {
  //     type: String, requried: true
  //   },
  //   vaccineType: {
  //     type: String, requried: true
  //   },
  //   vaccineDate: {
  //     type: String, requried: true
  //   }
  // }, 
  // passportScanData: {
  //   filename: {
  //     type: String,
  //   },
  //   contentType: {
  //     type: String,
  //   },
  //   s3URL: {
  //     type: String,
  //   }
  // },
  // nrcScanData: {
  //   filename: {
  //     type: String,
  //   },
  //   contentType: {
  //     type: String,
  //   },
  //   s3URL: {
  //     type: String,
  //   }
  // },
  // vaccineNotaryScanData: {
  //   filename: {
  //     type: String,
  //   },
  //   contentType: {
  //     type: String,
  //   },
  //   s3URL: {
  //     type: String,
  //   }
  // },
  // medicalOnlineScanData: {
  //   filename: {
  //     type: String,
  //   },
  //   contentType: {
  //     type: String,
  //   },
  //   s3URL: {
  //     type: String,
  //   }
  // },
  // trainingScanData: {
  //   filename: {
  //     type: String,
  //   },
  //   contentType: {
  //     type: String,
  //   },
  //   s3URL: {
  //     type: String,
  //   }
  // },
  // airTicketScanData: {
  //   filename: {
  //     type: String,
  //   },
  //   contentType: {
  //     type: String,
  //   },
  //   s3URL: {
  //     type: String,
  //   }
  // },
  // visaScanData: {
  //   filename: {
  //     type: String,
  //   },
  //   contentType: {
  //     type: String,
  //   },
  //   s3URL: {
  //     type: String,
  //   }
  // },
  // smartCardScanData: {
  //   filename: {
  //     type: String,
  //   },
  //   contentType: {
  //     type: String,
  //   },
  //   s3URL: {
  //     type: String,
  //   }
  // },
  // familyDataScanData: {
  //   filename: {
  //     type: String,
  //   },
  //   contentType: {
  //     type: String,
  //   },
  //   s3URL: {
  //     type: String,
  //   }
  // }
});

module.exports = mongoose.model('Employee', employeeSchema);

