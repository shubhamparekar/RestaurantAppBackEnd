const Order = require("../model/order");
const OrderedFoodItem = require("../model/orderedFoodItem");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../error/index");

const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).sort("createdAt");
  res.status(StatusCodes.OK).json({ orders, count: orders.count });
};

const getOrder = async (req, res) => {
  const { id: OrderID } = req.params;
  const order = await Order.findOne({ _id: OrderID });
  if (!order) {
    throw new NotFoundError(`No order with OrderID = ${OrderID} exists`);
  }
  res.status(StatusCodes.OK).json({ order });
};

const createOrder = async (req, res) => {
  const { foodOrder, foodItems } = req.body;
  const order = await Order.create(foodOrder);
  const foodArray = await OrderedFoodItem.insertMany(foodItems);
  res.status(StatusCodes.CREATED).json({ order, foodArray });
};

const updateOrder = async (req, res) => {
  const {
    params: { id: OrderID },
    body: {
      customerName,
      paymentMethod,
      grandTotal,
      orderedFoodItems,
      orderNumber,
    },
  } = req;

  if (!customerName || !orderedFoodItems) {
    throw new BadRequestError("All fields are required!");
  }

  const order = await Order.findOneAndUpdate({ _id: OrderID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!order) {
    throw new NotFoundError(`No order with OrderID = ${OrderID} exists`);
  }
  res.status(StatusCodes.OK).json({ order });
};

const deleteOrder = async (req, res) => {
  const { id: OrderID } = req.params;
  const order = await Order.findOneAndRemove({ _id: OrderID });
  if (!order) {
    throw new NotFoundError(`No order with OrderID = ${OrderID} exists`);
  }
  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
