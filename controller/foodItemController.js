const FoodItem = require("../model/foodItem");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../error/index");

const getAllFoodItems = async (req, res) => {
  const { foodCategoryName } = req.query;
  const queryObject = {};
  if (foodCategoryName) {
    queryObject.foodCategoryName = foodCategoryName;
  }
  const foodItems = await FoodItem.find(queryObject);
  if (!foodItems) {
    throw new NotFoundError(
      `No foodItem found in foodCategoryName = ${foodCategoryName}`
    );
  }
  res.status(StatusCodes.OK).json({ foodItems, count: foodItems.length });
};

const insertFoodItems = async (req, res) => {
  const foodArray = req.body;
  await FoodItem.insertMany(foodArray);
  res.status(StatusCodes.CREATED).json({ foodArray });
};

module.exports = {
  getAllFoodItems,
  insertFoodItems,
};
