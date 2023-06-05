import { NavLink } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { HiUsers, HiShoppingCart, HiCalendar } from "react-icons/hi";
import { IoStatsChartSharp } from "react-icons/io5";
import { GiRunningShoe } from "react-icons/gi";
import { CgNotes } from "react-icons/cg";
import { BiExit, BiPlus } from "react-icons/bi";
import { AiFillDollarCircle } from "react-icons/ai";

const Sidebar = () => {
  const activeLink =
    "flex justify-start items-center gap-3 py-2 px-3 text-white text-xl rounded-md bg-zinc-600";
  const pendingLink =
    "flex justify-start items-center gap-3 py-2 px-3 text-white text-xl rounded-md hover:bg-zinc-700";

  return (
    <div className="w-full h-full bg-zinc-800 hidden xl:block">
      <div className="p-7 font-yekan">
        <div className="flex justify-start items-center gap-2 mt-5 mb-12">
          <BsPersonCircle className="text-gray-400 text-3xl" />
          <span className="text-gray-300 text-xl">ادمین: </span>
          <span className="text-gray-200 text-xl"></span>
        </div>
        <div>
          <div className="p-5 space-y-3">
            <span className="text-gray-100">صفحه ها</span>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isActive ? activeLink : isPending ? pendingLink : pendingLink
              }
              end
            >
              <MdSpaceDashboard />
              <span>داشبورد</span>
            </NavLink>
            <NavLink
              to="/customers"
              className={({ isActive, isPending }) =>
                isActive ? activeLink : isPending ? pendingLink : pendingLink
              }
            >
              <HiUsers />
              <span>مشتریان</span>
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive, isPending }) =>
                isActive ? activeLink : isPending ? pendingLink : pendingLink
              }
            >
              <HiShoppingCart />
              <span>سفارش ها</span>
            </NavLink>
            <NavLink
              to="/financials"
              className={({ isActive, isPending }) =>
                isActive ? activeLink : isPending ? pendingLink : pendingLink
              }
            >
              <AiFillDollarCircle />
              <span>مدریت مالی</span>
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive, isPending }) =>
                isActive ? activeLink : isPending ? pendingLink : pendingLink
              }
            >
              <GiRunningShoe />
              <span>محصولات</span>
            </NavLink>
            <NavLink
              to="/add-product"
              className={({ isActive, isPending }) =>
                isActive ? activeLink : isPending ? pendingLink : pendingLink
              }
            >
              <BiPlus />
              <span>افزودن محصول</span>
            </NavLink>
          </div>
          <div className="p-5 space-y-3">
            <span className="text-gray-100">ابزار</span>
            <NavLink
              to="/notes"
              className={({ isActive, isPending }) =>
                isActive ? activeLink : isPending ? pendingLink : pendingLink
              }
              end
            >
              <CgNotes />
              <span>یادداشت ها</span>
            </NavLink>
            <NavLink
              to="/calendar"
              className={({ isActive, isPending }) =>
                isActive ? activeLink : isPending ? pendingLink : pendingLink
              }
              end
            >
              <HiCalendar />
              <span>تقویم</span>
            </NavLink>
            <NavLink
              to="/charts"
              className={({ isActive, isPending }) =>
                isActive ? activeLink : isPending ? pendingLink : pendingLink
              }
              end
            >
              <IoStatsChartSharp />
              <span>نمودار ها</span>
            </NavLink>
          </div>
          <div className="p-5">
            <button className="w-full flex justify-start items-center gap-3 py-2 px-3 text-white text-xl rounded-md hover:bg-zinc-700">
              <BiExit />
              <span>خروج</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
