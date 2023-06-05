import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["stansmith", "gazelle", "superstar", "ultraboost", "runfalcon"],
      required: true,
    },
    gender: { type: [String], enum: ["men", "women", "kids"], required: true },
    sizes: { type: [Number], require: true },
    color: { type: String, required: true },
    images: { type: [String], required: true },
    available: { type: Boolean, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const ProductsModel = mongoose.model("Products", ProductSchema);
