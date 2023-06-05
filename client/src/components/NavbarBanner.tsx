import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

interface IProps {
  title: string;
  description: string;
  image: string;
  route: string;
}

const NavbarBanner = ({ title, description, image, route }: IProps) => {
  return (
    <div className="nav-banner absolute z-20 top-20 w-full h-120 border-t border-b bg-white">
      <div className="grid grid-cols-12 gap-8 px-12 xl:px-80 py-10">
        <div className="col-span-4">
          <img src={image} />
        </div>
        <div className="col-span-8 flex flex-col justify-between items-start xl:py-12">
          <div>
            <p className="font-yekan text-3xl font-extrabold mb-2">{title}</p>
            <p className="font-yekan text-lg text-justify ">{description}</p>
          </div>
          <Link
            to={route}
            className="border-b border-l border-gray-900 pl-[2px] pb-[2px]"
          >
            <div className="flex justify-between items-center gap-2 py-3 px-8 bg-gray-900">
              <span className="font-yekan text-white">مشاهده و خرید</span>
              <IoIosArrowBack className="text-white" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarBanner;
