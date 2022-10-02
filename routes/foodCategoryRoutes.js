const express = require("express");
const router = express.Router();

const { getAllFoodCategories } = require("../controller/foodCategoryController");

router.route('/').get(getAllFoodCategories);

module.exports = router;
