import mongoose from "mongoose";

const FavoritesSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
});

const CartSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  amount: { type: Number, required: true },
  size: { type: Number, required: true },
  price: { type: Number, required: true },
});

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: { type: [FavoritesSchema], required: false },
    cart: { type: [CartSchema], required: false },
  },
  { timestamps: true }
);

export const UsersModel = mongoose.model("Users", UserSchema);
