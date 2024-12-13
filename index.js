const express = require("express");
const cookieParser = require("cookie-parser");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const companyRoutes = require("./routes/company.routes");
const meetingRoutes = require("./routes/meeting.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(req.userId);
});

app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/meeting", meetingRoutes);

app.get("*", (req, res) => {
  res.redirect("https://i.ytimg.com/vi/M6lkWjxg6-o/maxresdefault.jpg");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

require("./db");
