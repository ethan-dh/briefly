const router = require("express").Router();
const companyController = require("../controllers/company.controller");

router.get("/:id", companyController.companyInfos);

module.exports = router;
