import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

interface SidebarProps {
  activeSidebar: Boolean;
  setActivesidebar: (activeSidebar: Boolean) => void;
}

const Sidebar = ({ activeSidebar, setActivesidebar }: SidebarProps) => {
  return (
    <div
      className={
        activeSidebar
          ? "fixed top-0 w-full h-screen z-30 bg-white flex flex-col overflow-y-scroll transition-transform duration-300 translate-x-0"
          : "fixed top-0 w-full h-screen z-30 bg-white flex flex-col overflow-y-scroll transition-transform duration-300 translate-x-full"
      }
    >
      <div className="h-12 grid grid-cols-12 border-b border-gray-200">
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-center items-center">
          <Link to="/" onClick={() => setActivesidebar(!activeSidebar)}>
            <img className="w-16" src="/images/logo/logo.png" />
          </Link>
        </div>
        <div className="col-span-2 flex justify-end items-center pl-8">
          <button className="text-2xl hover:cursor-pointer">
            <MdClose onClick={() => setActivesidebar(!activeSidebar)} />
          </button>
        </div>
      </div>
      <div className="py-10 px-8">
        <div className="pb-5">
          <span className="text-2xl font-yekan font-bold select-none">
            دسته بندی محصولات
          </span>
        </div>
        <Link to="stan-smith" onClick={() => setActivesidebar(!activeSidebar)}>
          <div className="flex justify-between items-center mb-5 mr-5">
            <span className="font-yekan text-xl">استن اسمیت</span>
            <IoIosArrowBack />
          </div>
        </Link>
        <Link to="gazelle" onClick={() => setActivesidebar(!activeSidebar)}>
          <div className="flex justify-between items-center mb-5 mr-5">
            <span className="font-yekan text-xl">گزل</span>
            <IoIosArrowBack />
          </div>
        </Link>
        <Link to="superstar" onClick={() => setActivesidebar(!activeSidebar)}>
          <div className="flex justify-between items-center mb-5 mr-5">
            <span className="font-yekan text-xl">سوپر استار</span>
            <IoIosArrowBack />
          </div>
        </Link>
        <Link to="ultraboost" onClick={() => setActivesidebar(!activeSidebar)}>
          <div className="flex justify-between items-center mb-5 mr-5">
            <span className="font-yekan text-xl">الترابوست</span>
            <IoIosArrowBack />
          </div>
        </Link>
        <Link to="runfalcon" onClick={() => setActivesidebar(!activeSidebar)}>
          <div className="flex justify-between items-center mb-5 mr-5">
            <span className="font-yekan text-xl">ران فالکن</span>
            <IoIosArrowBack />
          </div>
        </Link>
      </div>
      <div className="px-8">
        <div className="pb-5">
          <span className="text-2xl font-yekan font-bold select-none">
            خدمات مشتریان{" "}
          </span>
        </div>
        <Link to="" onClick={() => setActivesidebar(!activeSidebar)}>
          <div className="flex justify-between items-center mb-5 mr-5">
            <span className="font-yekan text-xl">اصالت کالا</span>
            <IoIosArrowBack />
          </div>
        </Link>
        <Link to="" onClick={() => setActivesidebar(!activeSidebar)}>
          <div className="flex justify-between items-center mb-5 mr-5">
            <span className="font-yekan text-xl">نحوه خرید</span>
            <IoIosArrowBack />
          </div>
        </Link>
        <Link to="" onClick={() => setActivesidebar(!activeSidebar)}>
          <div className="flex justify-between items-center mb-5 mr-5">
            <span className="font-yekan text-xl">بازگشت کالا</span>
            <IoIosArrowBack />
          </div>
        </Link>
        <Link to="" onClick={() => setActivesidebar(!activeSidebar)}>
          <div className="flex justify-between items-center mb-5 mr-5">
            <span className="font-yekan text-xl">درباره ما</span>
            <IoIosArrowBack />
          </div>
        </Link>
        <Link to="" onClick={() => setActivesidebar(!activeSidebar)}>
          <div className="flex justify-between items-center mb-5 mr-5">
            <span className="font-yekan text-xl">تماس با ما</span>
            <IoIosArrowBack />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
