const express = require("express");
const cookieParser = require("cookie-parser");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const app = express();
const dotenv = require("dotenv").config();

const userRoutes = require("./routes/user.routes");
const companyRoutes = require("./routes/company.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(req.userId);
});

app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

require("./db");