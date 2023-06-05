import { Link } from "react-router-dom";
import { IoBagOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { BiHeart } from "react-icons/bi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { useUserContext } from "../contexts/UserContext";
import { useSetActiveRoute } from "./Profile";
import { useEffect } from "react";

const ProfileIndex = () => {
  const { user } = useUserContext();
  const { setActiveRoute } = useSetActiveRoute();

  useEffect(() => {
    setActiveRoute(null);
  }, []);

  return (
    <div className="p-8 space-y-5 mt-12 lg:mt-0">
      <Link
        to="orders"
        onClick={() => setActiveRoute("orders")}
        className="flex justify-between items-center font-yekan cursor-pointer p-5 bg-gray-100 rounded-lg"
      >
        <div className="flex items-center gap-3">
          <HiOutlineClipboardList className="text-6xl text-gray-700" />
          <div className="flex flex-col">
            <span className="text-xl">سفارش های من</span>
            <span>0 سفارش</span>
          </div>
        </div>
        <IoIosArrowBack className="text-3xl" />
      </Link>
      <Link
        to="/cart"
        className="flex justify-between items-center font-yekan cursor-pointer p-5 bg-gray-100 rounded-lg"
      >
        <div className="flex items-center gap-3">
          <IoBagOutline className="text-6xl text-gray-700" />
          <div className="flex flex-col">
            <span className="text-xl">سبد خرید</span>
            <span>{user.cart.length} محصول</span>
          </div>
        </div>
        <IoIosArrowBack className="text-3xl" />
      </Link>
      <Link
        to="favorites"
        onClick={() => setActiveRoute("favorites")}
        className="flex justify-between items-center font-yekan cursor-pointer p-5 bg-gray-100 rounded-lg"
      >
        <div className="flex items-center gap-3">
          <BiHeart className="text-6xl text-gray-700" />
          <div className="flex flex-col">
            <span className="text-xl">علاقه مندی ها</span>
            <span>{user.favorites.length} محصول</span>
          </div>
        </div>
        <IoIosArrowBack className="text-3xl" />
      </Link>
    </div>
  );
};

export default ProfileIndex;
