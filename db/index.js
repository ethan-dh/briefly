const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URI)
  .then((connection) =>
    console.log(`Connecté à MongoDB (DB: ${connection.connection.name})`)
  )
  .catch((err) => console.log("Erreur de connexion à MongoDB: " + err));
