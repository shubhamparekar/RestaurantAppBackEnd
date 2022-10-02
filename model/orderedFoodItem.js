const mongoose = require("mongoose");

const OrderedFoodItemSchema = new mongoose.Schema({
  foodItemID: {
    type: mongoose.ObjectId,
  },
  orderNumber: {
    type: Number,
  },
  foodItemName: {
    type: String,
    required: [true, "The name of the food item is required"],
  },
  price: {
    type: Number,
    required: [true, "The price of the food item is required"],
  },
  quantity: {
    type: Number,
    required: [true, "The quantity of the item is required"],
  },
  paymentMethod: {
    type: String,
    required: [true, "The payment method is required"],
  },
  totalPrice: {
    type: Number,
    required: [true, "The total price of the food items is required"],
  },
});

module.exports = mongoose.model("OrderedFoodItem", OrderedFoodItemSchema);
