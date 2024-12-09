const router = require("express").Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/:id", userController.userInfos);

module.exports = router;
