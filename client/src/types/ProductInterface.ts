import { Key } from "react";

export interface IProduct {
  _id: Key;
  name: string;
  description: string;
  category: string;
  gender: string[];
  sizes: number[];
  color: string;
  images: string[];
  available: boolean;
  price: number;
}
