const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tier: {
      type: String,
      required: true,
      enum: ["free", "premium", "enterprise"],
    },
    admin_email: { type: String, required: true },
    address: {
      type: Object,
      required: true,
      number: { type: String, required: true },
      street: { type: String, required: true },
      zip_code: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      details: { type: String },
    },
    phone: {
      type: String,
      required: true,
    },
    website: { type: String },
  },
  { timestamps: true }
);

const CompanyModel = mongoose.model("company", companySchema);

module.exports = CompanyModel;
