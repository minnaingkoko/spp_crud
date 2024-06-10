const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    companyAddress: { type: String, },
    postCode: { type: String, },
    demandTotal: {
      male: { type: String, required: true },
      female: { type: String, required: true }
    },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    demandLetterScanData: {
      filename: {
        type: String,
        required: true
      },
      contentType: {
        type: String,
        required: true
      },
      s3URL: {
        type: String,
        required: true
      }
    },
    KSMScanData: {
      filename: {
        type: String,
        required: true
      },
      contentType: {
        type: String,
        required: true
      },
      s3URL: {
        type: String,
        required: true
      }
    },
    companyProfileScanData: {
      filename: {
        type: String,
        required: true
      },
      contentType: {
        type: String,
        required: true
      },
      s3URL: {
        type: String,
        required: true
      }
    },
    companyPhNo: { type: String },
    callingCopyScanData: {
      filename: {
        type: String,
        required: true
      },
      contentType: {
        type: String,
        required: true
      },
      s3URL: {
        type: String,
        required: true
      }
    },
    callingOrgScanData: {
      filename: {
        type: String,
        required: true
      },
      contentType: {
        type: String,
        required: true
      },
      s3URL: {
        type: String,
        required: true
      }
    },
    notaryScanData: {
      filename: {
        type: String,
        required: true
      },
      contentType: {
        type: String,
        required: true
      },
      s3URL: {
        type: String,
        required: true
      }
    },
  });
  
  const Company = mongoose.model('Company', companySchema);
  
  module.exports = Company;