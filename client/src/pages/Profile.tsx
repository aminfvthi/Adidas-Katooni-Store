import { useState, useEffect } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { IoBagOutline } from "react-icons/io5";
import { BiHeart, BiExit } from "react-icons/bi";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";

type ContextType = {
  setActiveRoute: React.Dispatch<React.SetStateAction<string | null>>;
};

export function useSetActiveRoute() {
  return useOutletContext<ContextType>();
}

const Profile = () => {
  const [activeRoute, setActiveRoute] = useState<string | null>(null);
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

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

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      favorites: [],
      cart: [],
    });
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen">
      <div className="mt-12 lg:mt-20 lg:grid lg:grid-cols-12 px-2 sm:px-4 lg:px-16 xl:px-48">
        <div className="px-5 mt-16 border-b lg:border lg:py-5 lg:mt-12 lg:max-w-sm lg:max-h-64 lg:col-span-3">
          <div className="flex items-center gap-2 py-3 px-3 border-b">
            <BsPersonCircle className="text-5xl text-gray-400" />
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold font-yekan text-gray-700">{`${user.firstName} ${user.lastName}`}</span>
              <span className="text-sm font-medium text-gray-500">
                {user.email}
              </span>
            </div>
          </div>
          <button
            className={
              activeRoute == "orders"
                ? "flex justify-start items-center gap-2 w-full border-b border-l border-r bg-gray-100 py-3 px-4 font-yekan lg:hover:bg-gray-100"
                : "flex justify-start items-center gap-2 w-full border-b py-3 px-4 font-yekan lg:hover:bg-gray-100"
            }
            onClick={() => {
              setActiveRoute("orders");
              navigate("orders");
            }}
          >
            <IoBagOutline className="text-xl" />
            <span className="text-gray-800">سفارش ها</span>
          </button>
          <button
            className={
              activeRoute == "favorites"
                ? "flex justify-start items-center gap-2 w-full border-b border-l border-r bg-gray-100 py-3 px-4 font-yekan lg:hover:bg-gray-100"
                : "flex justify-start items-center gap-2 w-full border-b py-3 px-4 font-yekan lg:hover:bg-gray-100"
            }
            onClick={() => {
              setActiveRoute("favorites");
              navigate("favorites");
            }}
          >
            <BiHeart className="text-xl" />
            <span className="text-gray-800">علاقه مندی ها</span>
          </button>
          <button
            className="flex justify-start items-center gap-2 w-full py-3 px-4 font-yekan lg:hover:bg-gray-100"
            onClick={handleLogOut}
          >
            <BiExit className="text-xl" />
            <span className="text-gray-800">خروج</span>
          </button>
        </div>
        <div className="lg:col-span-9 lg:border lg:mt-12 lg:mr-5">
          <Outlet context={{ setActiveRoute }} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
