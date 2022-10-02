const OrderedFoodItem = require("../model/orderedFoodItem");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../error/index");

const getFoodItems = async (req, res) => {
  const { orderNumber, foodItemName, quantity, paymentMethod, totalPrice } = req.query;
  const queryObject = {};

  if (orderNumber) {
    queryObject.orderNumber = orderNumber;
  }

  if (foodItemName) {
    queryObject.foodItemName = foodItemName;
  }

  if (quantity) {
    queryObject.quantity = quantity;
  }

  if (paymentMethod) {
    queryObject.paymentMethod = paymentMethod;
  }

  if (totalPrice) {
    queryObject.totalPrice = totalPrice;
  }

  const foodItems = await OrderedFoodItem.find(queryObject);
  if (!foodItems) {
    throw new NotFoundError(`No foodItems found`);
  }
  res.status(StatusCodes.OK).json({ foodItems, count: foodItems.length });
};

module.exports = {
  getFoodItems,
};
