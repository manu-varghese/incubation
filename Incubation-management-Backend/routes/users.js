var express = require("express");
var router = express.Router();
const {
  authUser,
  authorizeUser,
  addApplication,
  fetchUser,
  didApply,
  uploadLogo,
} = require("../controllers/user");
const { verifyToken, verify } = require("../middleware/auth");

/* GET users listing. */
router.get("/", verifyToken);

router.post("/register", authUser);

router.post("/login", authorizeUser);

router.post("/application", addApplication);

router.get("/getUserInfo", fetchUser);

router.get('/didApply/:id',didApply)

router.post('/upload-file/:id',uploadLogo)


   
// router.get('/logout', verifyToken)

module.exports = router;
