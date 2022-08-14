const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  productId: {
    type: mongoose.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
});

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    orderPlacedOn: {
      type: Date,
      default: Date.now,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    orderDeliveredOn: {
      type: Date,
      default: "",
    },
    cart: {
      type: [cartSchema],
      required: true,
    },
  },
  { versionKey: false }
);

const OrderModel = mongoose.model("orders", orderSchema, "orders");

module.exports = OrderModel;
