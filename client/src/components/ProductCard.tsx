import { Link } from "react-router-dom";
import { Key } from "react";

interface IProductCardProps {
  _id: Key;
  category: string;
  name: string;
  gender: string[];
  images: string[];
  price: number;
  available: boolean;
}

const ProductCard = ({
  _id,
  category,
  name,
  images,
  gender,
  price,
  available,
}: IProductCardProps) => {
  return (
    <Link
      to={`/${category}/${_id}`}
      className="col-span-6 sm:col-span-4 lg:col-span-3 border border-white lg:hover:border-gray-200 lg:hover:shadow-lg"
    >
      <div className="w-full relative">
        <img src={images[0]} />
        <span className="absolute z-10 bottom-0 left-1 lg:left-2 text-xs lg:text-sm font-yekan px-2 pt-1 bg-white text-gray-600">
          {gender[0] == "kids" ? "بچه گانه" : "مردانه / زنانه"}
        </span>
      </div>
      <div className="w-full flex flex-col py-3 px-2">
        <span className="font-yekan text-sm md:text-md lg:text-lg font-bold">
          {name}
        </span>
        {available ? (
          <span className="font-yekan text-xs md:text-sm lg:text-md text-gray-600">{`${price.toLocaleString()} تومان`}</span>
        ) : (
          <span className="font-yekan text-xs md:text-sm lg:text-md text-red-600">
            نا موجود
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
