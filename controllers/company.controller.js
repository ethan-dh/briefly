const Company = require("../models/company.model");
const User = require("../models/user.model");
const Meeting = require("../models/meeting.model");

module.exports.createCompany = async (req, res) => {
  const user = await User.findById(req.userId);
  const company = await Company.findOne({ admin_email: user.email });

  if (company)
    return res.status(400).json({
      error:
        "Vous avez déjà une entreprise. Veuillez la supprimer avant d'en créer une nouvelle.",
    });

  try {
    const company = await Company.create({
      ...req.body,
      admin_email: user.email,
    });
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.companyInfos = async (req, res) => {
  const user = await User.findById(req.userId);
  const company = await Company.findById(user.company_id);
  res.status(200).json(company);
};

module.exports.allInfos = async (req, res) => {
  const user = await User.findById(req.userId);
  const company = await Company.findById(user.company_id);
  if (!company)
    return res.status(404).json({ error: "Entreprise non trouvée." });

  const meetings = await Meeting.find({ company_id: company._id });

  const meetingsInfos = meetings.map((meeting) => {
    return {
      date: meeting.date,
      duration: meeting.duration,
      words: meeting.words,
      summary: meeting.summary,
      pdf_report: meeting.pdf_report,
    };
  });

  res.status(200).json(company);
};

module.exports.deleteCompany = async (req, res) => {
  const user = await User.findById(req.userId);
  const company = await Company.findById(user.company_id);
  if (!company)
    return res.status(404).json({ error: "Entreprise non trouvée." });

  await Company.deleteOne({ _id: company._id });
  res.status(200).json({ message: "Entreprise supprimée." });
};
