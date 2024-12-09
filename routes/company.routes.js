const router = require("express").Router();
const companyController = require("../controllers/company.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.post("/create", requireAuth, companyController.createCompany);
router.get("/mine", requireAuth, companyController.companyInfos);

router.get("/mine/allInfos", requireAuth, companyController.allInfos);
router.delete("/mine/delete", requireAuth, companyController.deleteCompany);

module.exports = router;
