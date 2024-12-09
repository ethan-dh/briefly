const Meeting = require("../models/meeting.model");

module.exports.meetingInfos = async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);
  res.status(200).json(meeting);
};
