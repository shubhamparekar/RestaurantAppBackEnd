const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
    },
    customerName: {
      type: String,
      required: [true, "Mention the name of the customer"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Mention the payment method"],
    },
    grandTotal: {
      type: Number,
    },
    orderedFoodItems: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
