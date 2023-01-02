var express = require("express");
var router = express.Router();
const { adminLogin } = require("../controllers/admin");
const {
  getCompanies,
  applicationApprove,
  getAllCompanies,
  getApprovedCompanies,
  bookSlot,
  getSlots,
  blockUser,
  unblockUser,
} = require("../controllers/admin");
const {verifyAdminToken} = require('../middleware/adminAuth')
const Slot = require("../models/slot");

/* GET users listing. */
router.get('/',verifyAdminToken)

router.post("/login", adminLogin);

router.get("/getCompaniesInfo", getCompanies);

router.get("/applicationApprove/:id", applicationApprove);

router.get("/getApplicationList", getAllCompanies);

router.get("/getApprovedCompanies", getApprovedCompanies);

router.patch("/bookSlot", bookSlot);

router.get("/getSlots", getSlots);

router.get('/blockUser/:id',blockUser)

router.get('/unblockUser/:id',unblockUser)

module.exports = router;
