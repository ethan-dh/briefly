const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
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
    summary: { type: String },
    pdf_report: { type: String },
  },
  { timestamps: true }
);

const MeetingModel = mongoose.model("meeting", meetingSchema);

module.exports = MeetingModel;