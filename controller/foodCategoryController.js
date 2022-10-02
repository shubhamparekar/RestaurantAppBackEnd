const FoodCategory = require("../model/foodCategory");
const { StatusCodes } = require("http-status-codes");

const getAllFoodCategories = async (req, res) => {
  const foodCategories = await FoodCategory.find({});
  res
    .status(StatusCodes.OK)
    .json({ foodCategories, count: foodCategories.length });
};

module.exports = { getAllFoodCategories };
