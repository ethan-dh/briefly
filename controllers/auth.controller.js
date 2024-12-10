const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const Company = require("../models/company.model");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.register = async (req, res) => {
  const {
    email,
    password,
    last_name,
    first_name,
    company_name,
    address,
    phone,
    website,
  } = req.body;

  try {
    // Créer l'entreprise
    const company = await Company.create({
      name: company_name,
      tier: "free", // Par défaut, ou selon vos besoins
      admin_email: email,
      address,
      phone,
      website,
    });

    // Créer l'utilisateur avec l'ID de l'entreprise
    const user = await UserModel.create({
      email,
      password,
      last_name,
      first_name,
      company_id: company._id,
    });

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ loggedOut: true, message: "Vous êtes déconnecté" });
};
