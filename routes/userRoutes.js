const express = require("express");
const router = express.Router();

const {
  checkEmailIdExists,
  checkUserNameExists,
  createUser,
  logInUser,
  logOutUser,
} = require("../controller/userController");

router.route("/checkEmailIdExists").get(checkEmailIdExists)
router.route("/checkUserNameExists").get(checkUserNameExists)
router.route("/createUser").post(createUser)
router.route("/logInUser").get(logInUser)
router.route("/logOutUser").get(logOutUser)

module.exports = router