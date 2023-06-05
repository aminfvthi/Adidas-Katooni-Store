import { useEffect } from "react";
import { useUserContext } from "../contexts/UserContext";
import { BiTrash } from "react-icons/bi";

import axios from "axios";

const Cart = () => {
  const { user, setUser, removeFromCart } = useUserContext();
  let totalPrice = 0;
  user.cart.forEach(
    (product) => (totalPrice += product.price * product.amount)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/api/users/user", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setUser(response.data);
    };
    if (!localStorage.getItem("token")) return;
    fetch();
  }, []);

  return (
    <div className="w-full min-h-screen mt-12 lg:mt-20">
      <div className="flex justify-center items-start pt-5 px-2 sm:pt-12 sm:px-20 md:px-40 lg:gap-5">
        <div className="w-96 border p-5 space-y-5 hidden lg:block">
          <div className="flex justify-between items-center font-yekan text-lg font-bold">
            <span>جمع سبد خرید:</span>
            <span>{totalPrice.toLocaleString()} تومان</span>
          </div>
          <button
            type="submit"
            className="border-b border-l border-gray-900 w-full pl-[2px] pb-[2px]"
          >
            <div className="flex justify-center items-center py-3 bg-gray-900">
              <span className="font-yekan text-white">ثبت سفارش</span>
            </div>
          </button>
        </div>
        <div className="sm:border sm:p-5 space-y-3">
          {user.cart.length > 0 ? (
            user.cart.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-12 font-yekan max-w-screen-sm"
              >
                <div className="col-span-5 lg:col-span-4">
                  <img src={product.image} />
                </div>
                <div className="col-span-7 lg:col-span-8 flex flex-col justify-between pr-2 lg:pr-5 py-4">
                  <div className="flex flex-col justify-between">
                    <span className="font-bold lg:text-xl">{product.name}</span>
                    <span className="text-gray-600 lg:text-lg">
                      سایز:{" "}
                      <span className="text-gray-900">{product.size}</span>
                    </span>
                    <span className="text-gray-600 lg:text-lg">
                      تعداد:{" "}
                      <span className="text-gray-900">{product.amount}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-gray-600 lg:text-xl">
                      قیمت:{" "}
                      <span className="text-gray-900">{`${(
                        product.price * product.amount
                      ).toLocaleString()} تومان`}</span>
                    </span>
                    <button
                      onClick={() => removeFromCart(product._id)}
                      className="bg-gray-200 p-2 rounded-md"
                    >
                      <BiTrash className="text-2xl lg:text-3xl text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-96 py-20 flex justify-center items-center">
              <span className="font-yekan font-bold text-xl">
                سبد خرید شما خالی می باشد!
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="product-page-bottom-nav fixed bg-white bottom-0 right-0 w-full pb-16 font-yekan lg:hidden">
        <div className="flex justify-between items-center text-xl font-bold py-8 px-8 sm:px-20 md:px-40">
          <span>جمع سبد خرید:</span>
          <span>{totalPrice} تومان</span>
        </div>
        <div className="flex justify-center items-center w-full px-8 sm:px-20 md:px-40 gap-5">
          <button
            type="submit"
            className="border-b border-l border-gray-900 w-full pl-[2px] pb-[2px]"
          >
            <div className="flex justify-center items-center py-3 bg-gray-900">
              <span className="font-yekan text-white">ثبت سفارش</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
