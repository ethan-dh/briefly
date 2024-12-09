const mongoose = require("mongoose");

const reunionSchema = new mongoose.Schema(
  {
    company_id: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    words: [
      {
        text: { type: String, required: true },
        start: { type: Number, required: true },
        end: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("reunion", reunionSchema);
