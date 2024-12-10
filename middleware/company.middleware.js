const CompanyModel = require("../models/company.model");
const { isValidObjectId } = require("mongoose");

module.exports.companyAccess = async (req, res, next) => {
  const company_id = req.body.company_id || req.query.company_id;

  if (company_id) {
    if (!isValidObjectId(company_id)) {
      return res.status(400).json({ error: "ID d'entreprise invalide" });
    }
    // const company = await CompanyModel.findById(company_id);
    // if (company) {
    req.company_id = company_id;
    next();
    // } else {
    //   res.status(401).json({ error: "Accès interdit" });
    // }
  } else {
    res.status(401).json({ error: "Accès interdit" });
  }
};
