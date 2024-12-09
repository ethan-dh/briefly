const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        req.userId = null;
        res.clearCookie("jwt");
      } else {
        let user = await UserModel.findById(decodedToken.id).select(
          "-password"
        );
        if (user) {
          req.userId = user.id;
          next();
        } else {
          res.clearCookie("jwt");
          res.status(401).json({ error: "Authentification requise" });
        }
      }
    });
  } else {
    req.userId = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        req.userId = null;
        res.clearCookie("jwt");
        return res.status(401).json({ error: "Authentification requise" });
      } else {
        req.userId = decodedToken.id;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Authentification requise" });
  }
};
