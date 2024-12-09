const router = require("express").Router();
const meetingController = require("../controllers/meeting.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.get("/:id", requireAuth, meetingController.meetingInfos);

module.exports = router;
