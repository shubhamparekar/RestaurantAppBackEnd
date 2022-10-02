const express = require("express");
const router = express.Router();

const {
  getAllFoodItems,
  insertFoodItems,
} = require("../controller/foodItemController");

router.route("/").get(getAllFoodItems);
router.route("/insertDocs").post(insertFoodItems);


module.exports = router;
