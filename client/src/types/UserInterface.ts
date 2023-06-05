import { Key } from "react";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  favorites: IFavorite[];
  cart: ICart[];
}

export interface IFavorite {
  _id: Key;
  name: string;
  category: string;
  image: string;
  price: number;
}

export interface ICart {
  _id: Key;
  name: string;
  image: string;
  amount: number;
  size: number;
  price: number;
}
