import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { MdSpaceDashboard, MdClose } from "react-icons/md";
import { HiUsers, HiShoppingCart, HiCalendar } from "react-icons/hi";
import { IoStatsChartSharp } from "react-icons/io5";
import { GiRunningShoe } from "react-icons/gi";
import { CgNotes } from "react-icons/cg";
import { BiExit, BiPlus } from "react-icons/bi";
import { AiFillDollarCircle } from "react-icons/ai";

interface IProps {
  activeMobileSidebar: boolean;
  setActiveMobileSidebar: Dispatch<SetStateAction<boolean>>;
}

const MobileSidebar = ({
  activeMobileSidebar,
  setActiveMobileSidebar,
}: IProps) => {
  return (
    <div
      className={
        activeMobileSidebar
          ? "fixed z-10 top-0 w-72 h-screen bg-zinc-800 xl:hidden overflow-y-scroll transition-transform duration-300 translate-x-0 shadow-2xl shadow-black"
          : "fixed z-10 top-0 w-72 h-screen bg-zinc-800 xl:hidden overflow-y-scroll transition-transform duration-300 translate-x-72"
      }
    >
      <div className="p-5 font-yekan">
        <div className="flex justify-end items-center mb-8">
          <button
            onClick={() => setActiveMobileSidebar(false)}
            className="text-white text-2xl"
          >
            <MdClose />
          </button>
        </div>
        <div className="flex justify-start items-center gap-2 mb-8">
          <BsPersonCircle className="text-gray-400 text-3xl" />
          <span className="text-gray-300 text-xl">ادمین: </span>
          <span className="text-gray-200 text-xl"></span>
        </div>
        <div>
          <div className="p-5 space-y-3">
            <span className="text-gray-100">صفحه ها</span>
            <Link
              to="/"
              onClick={() => setActiveMobileSidebar(false)}
              className="flex justify-start items-center gap-3 py-2 px-3 text-white text-xl"
            >
              <MdSpaceDashboard />
              <span>داشبورد</span>
            </Link>
            <Link
              to="/customers"
              onClick={() => setActiveMobileSidebar(false)}
              className="flex justify-start items-center gap-3 py-2 px-3 text-white text-xl"
            >
              <HiUsers />
              <span>مشتریان</span>
            </Link>
            <Link
              to="orders"
              onClick={() => setActiveMobileSidebar(false)}
              className="flex justify-start items-center gap-3 py-2 px-3 text-white text-xl"
            >
              <HiShoppingCart />
              <span>سفارش ها</span>
            </Link>
            <Link
              to="/financials"
              onClick={() => setActiveMobileSidebar(false)}
              className="flex justify-start items-center gap-3 py-2 px-3 text-white text-xl"
            >
              <AiFillDollarCircle />
              <span>مدریت مالی</span>
            </Link>
            <Link
              to="/products"
              onClick={() => setActiveMobileSidebar(false)}
              className="flex justify-start items-center gap-3 py-2 px-3 text-white text-xl"
            >
              <GiRunningShoe />
              <span>محصولات</span>
            </Link>
            <Link
              to="/add-product"
              onClick={() => setActiveMobileSidebar(false)}
              className="flex justify-start items-center gap-3 py-2 px-3 text-white text-xl"
            >
              <BiPlus />
              <span>افزودن محصول</span>
            </Link>
          </div>
          <div className="p-5 space-y-3">
            <span className="text-gray-100">ابزار</span>
            <Link
              to="/notes"
              onClick={() => setActiveMobileSidebar(false)}
              className="flex justify-start items-center gap-3 py-2 px-3 text-white text-xl"
            >
              <CgNotes />
              <span>یادداشت ها</span>
            </Link>
            <Link
              to="/calendar"
              onClick={() => setActiveMobileSidebar(false)}
              className="flex justify-start items-center gap-3 py-2 px-3 text-white text-xl"
            >
              <HiCalendar />
              <span>تقویم</span>
            </Link>
            <Link
              to="/charts"
              onClick={() => setActiveMobileSidebar(false)}
              className="flex justify-start items-center gap-3 py-2 px-3 text-white text-xl"
            >
              <IoStatsChartSharp />
              <span>نمودار ها</span>
            </Link>
          </div>
          <div className="p-5">
            <button className="w-full flex justify-start items-center gap-3 py-2 px-3 text-white text-xl">
              <BiExit />
              <span>خروج</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
