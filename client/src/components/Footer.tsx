import { Link } from "react-router-dom";
import {
  BsInstagram,
  BsTelegram,
  BsFacebook,
  BsTwitter,
  BsReddit,
} from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <div className="bg-gray-200 mt-28 py-16 flex justify-center">
        <div className="grid grid-cols-12 lg:w-8/12 xl:w-7/12">
          <div className="col-span-12 lg:col-span-6 flex gap-10 md:gap-16 xl:gap-20">
            <div className="font-yekan flex flex-col gap-1">
              <span className="text-xl font-bold ">دسته بندی محصولات</span>
              <Link to="stan-smith">استن اسمیت</Link>
              <Link to="gazelle">گزل</Link>
              <Link to="superstar">سوپر استار</Link>
              <Link to="ultraboost">الترابوست</Link>
              <Link to="runfalcon">ران فالکن</Link>
            </div>
            <div className="font-yekan flex flex-col gap-1">
              <span className="text-xl font-bold">خدمات مشتریان</span>
              <span className="hover:cursor-pointer">اصالت کالا</span>
              <span className="hover:cursor-pointer">نحوه خرید</span>
              <span className="hover:cursor-pointer">بازگشت کالا</span>
              <span className="hover:cursor-pointer">درباره ما</span>
              <span className="hover:cursor-pointer">تماس با ما</span>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 mt-12">
            <div className="flex justify-center items-start">
              <span className="font-yekan text-2xl font-bold mb-3">
                ما را در فضای مجازی دنبال کنید
              </span>
            </div>
            <div className="flex justify-center items-center gap-7 text-2xl">
              <BsInstagram className="hover:cursor-pointer" />
              <BsFacebook className="hover:cursor-pointer" />
              <BsTwitter className="hover:cursor-pointer" />
              <BsTelegram className="hover:cursor-pointer" />
              <BsReddit className="hover:cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 py-4 text-sm lg:text-md">
        <span className="font-yekan">تمامی حقوق محصفوظ می باشد</span>
        <span>|</span>
        <span>Copyright 2023</span>
      </div>
    </>
  );
};

export default Footer;
