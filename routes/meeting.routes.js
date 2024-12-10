const router = require("express").Router();
const meetingController = require("../controllers/meeting.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const { companyAccess } = require("../middleware/company.middleware");
const upload = require("../middleware/upload.middleware");

router.get("/:id", requireAuth, meetingController.meetingInfos);
router.post("/create", companyAccess, meetingController.createPendingMeeting);
router.patch(
  "/upload/:company_id/:id",
  upload.single("audio"),
  meetingController.uploadAudio
);
router.get("/audio/:id", requireAuth, meetingController.getAudioFile);

module.exports = router;
