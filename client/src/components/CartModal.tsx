import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { IoIosArrowBack } from "react-icons/io";

const CartModal = () => {
  const { user } = useUserContext();
  let totalPrice = 0;
  user.cart.forEach(
    (product) => (totalPrice += product.price * product.amount)
  );
  return (
    <div className="cart-modal absolute top-20 left-16 xl:left-48 w-96 bg-white border drop-shadow-lg font-yekan">
      <div className="flex justify-end items-center py-2 px-3 border-b">
        <button className="flex items-center gap-1">
          <Link to="/cart">مشاهده سبد خرید</Link>
          <IoIosArrowBack />
        </button>
      </div>
      <div className="flex flex-col items-start max-h-96 overflow-scroll p-1 space-y-1">
        {user.cart.map((product) => {
          return (
            <div key={product._id} className="grid grid-cols-12">
              <div className="col-span-5">
                <img src={product.image} />
              </div>
              <div className="col-span-7 flex flex-col justify-between pr-5 py-5">
                <div className="flex flex-col">
                  <span className="font-bold">{product.name}</span>
                  <span className="text-gray-600">
                    سایز: <span className="text-gray-900">{product.size}</span>
                  </span>
                  <span className="text-gray-600">
                    تعداد:{" "}
                    <span className="text-gray-900">{product.amount}</span>
                  </span>
                </div>
                <span className="text-gray-600">
                  قیمت:{" "}
                  <span className="text-gray-900">{`${(
                    product.price * product.amount
                  ).toLocaleString()} تومان`}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center p-3 border-t">
        <div className="flex flex-col">
          <span className="text-gray-600">مبلغ قابل پرداخت</span>
          <span className="text-gray-900 font-bold">
            {totalPrice.toLocaleString()} تومان
          </span>
        </div>
        <button className="border-b border-l border-gray-900 pl-[1px] pb-[1px]">
          <span className="flex justify-between items-center gap-2 py-2 px-12 bg-gray-900 text-white">
            ثبت سفارش
          </span>
        </button>
      </div>
    </div>
  );
};

export default CartModal;
