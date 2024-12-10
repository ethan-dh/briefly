const Meeting = require("../models/meeting.model");
const User = require("../models/user.model");
const path = require("path");
const fs = require("fs");

module.exports.meetingInfos = async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);
  res.status(200).json(meeting);
};

module.exports.createPendingMeeting = async (req, res) => {
  const company_id = req.company_id;
  try {
    const newMeeting = await Meeting.create({
      company_id: company_id,
      date: new Date().getDate(),
      status: "pending",
    });

    res.status(201).json(newMeeting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.uploadAudio = async (req, res) => {
  const company_id = req.params.company_id;
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Fichier audio requis." });
    }

    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: "Réunion non trouvée." });
    }

    if (meeting.company_id != company_id) {
      return res.status(403).json({ error: "Accès interdit." });
    }

    const audioPath = `/public/meetings/${req.file.filename}`;

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      {
        audio_path: audioPath,
        status: "completed",
        duration: req.body.duration,
      },
      { new: true }
    );

    res.status(200).json(updatedMeeting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getAudioFile = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: "Réunion non trouvée." });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non authentifié." });
    }

    if (user.company_id != meeting.company_id) {
      return res.status(403).json({ error: "Accès interdit." });
    }

    const filePath = path.join(
      __dirname,
      "../public/meetings",
      path.basename(meeting.audio_path)
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Fichier audio non trouvé." });
    }

    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
