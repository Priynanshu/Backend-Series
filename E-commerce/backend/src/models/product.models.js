const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    category: {
      type: String,
      required: true,
      enum: ["Electronics", "Fashion", "Grocery", "Beauty", "Home"]
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },

    image: {
      type: String,
      default: "https://ik.imagekit.io/a3d4qfkiw/productcover.jpg"
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;