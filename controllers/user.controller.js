const UserModel = require("../models/user.model");

module.exports.userInfos = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID invalide ou inconnu: " + req.params.id);

  UserModel.findById(req.params.id)
    .select("-password")
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.log("ID inconnu:" + err);
    });
};
