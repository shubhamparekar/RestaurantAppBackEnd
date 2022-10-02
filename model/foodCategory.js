const mongoose = require("mongoose");

const FoodCategorySchema = new mongoose.Schema({
  foodCategoryName: {
    type: String,
    required: [true, "Mention which category does this item belong to"],
  },
  icon: {
    type: String,
  },
});

module.exports = mongoose.model("FoodCategory", FoodCategorySchema);
