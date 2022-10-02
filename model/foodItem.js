const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
  foodItemName: {
    type: String,
    required: [true, "The name of the food item is required"],
  },
  price: {
    type: Number,
    required: [true, "The price of the food item is required"],
  },
  foodCategoryName: {
    type: String,
    required: [true, "Mention which category does this item belong to"],
  },
  foodCategory: {
    type: String,
    required: [true, "Mention whether the item is Veg or Non-Veg"],
  },
});

module.exports = mongoose.model("FoodItem", FoodItemSchema);
