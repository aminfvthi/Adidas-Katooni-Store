import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdSearch } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { IoBagOutline } from "react-icons/io5";
import { useLoginModalContext } from "../contexts/LoginModalContext";
import { useUserContext } from "../contexts/UserContext";
import { useState, useEffect } from "react";
import { CartModal } from "./";
import { NavbarBanner } from "./";

interface IProps {
  activeSidebar: Boolean;
  setActivesidebar: (activeSidebar: Boolean) => void;
}

const Navbar = ({ activeSidebar, setActivesidebar }: IProps) => {
  const { user } = useUserContext();
  const { activeLoginModal, setActiveLoginModal } = useLoginModalContext();
  const [navIsVisible, setNavIsVisible] = useState(true);
  const navigate = useNavigate();

  let totalAmount = 0;
  user.cart.forEach((product) => (totalAmount += product.amount));

  let lastScroll = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (lastScroll < currentScroll && navIsVisible) {
        setNavIsVisible(false);
      }
      if (lastScroll > currentScroll && !navIsVisible) {
        setNavIsVisible(true);
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navIsVisible]);

  return (
    <div
      className={
        navIsVisible
          ? "z-20 h-12 lg:h-20 px-4 fixed w-full lg:px-16 xl:px-48 shadow-md bg-white grid grid-cols-12 transition-all duration-300 top-0"
          : "z-20 h-12 lg:h-20 px-4 fixed w-full lg:px-16 xl:px-48 shadow-md bg-white grid grid-cols-12 transition-all duration-300 -top-12 lg:-top-20"
      }
    >
      <div className="col-span-4 flex items-center justify-stat lg:hidden">
        <button className="text-3xl hover:cursor-pointer rota">
          <GiHamburgerMenu onClick={() => setActivesidebar(!activeSidebar)} />
        </button>
      </div>
      <div className="col-span-4 lg:col-span-2 flex justify-center lg:justify-start items-center lg:items-end">
        <Link to="/">
          <img className="w-16 lg:w-24" src="/images/logo/logo.png" />
        </Link>
      </div>
      <div className="hidden lg:col-span-8 lg:flex justify-center items-end ">
        <span className="font-yekan text-lg select-none font-extrabold pb-3 ml-2">
          دسته بندی ها
        </span>
        <span className="font-yekan text-lg select-none font-extrabold pb-3 mx-2 ">
          |
        </span>
        <div className="nav-item pb-[10px] border-b-2 border-white hover:border-gray-900">
          <Link to="stan-smith" className="mx-2 font-yekan text-lg select-none">
            استن اسمیت
          </Link>
          <NavbarBanner
            title="استن اسمیت، برای همیشه. همیشه نمادین اکنون پایدارتر است."
            description="
              جذابیت بی انتها سبک بدون زحمت تطبیق پذیری روزمره برای بیش از 50
              سال و در حال حاضر، کفش های آدیداس استن اسمیت همچنان جایگاه خود را
              به عنوان یک نماد حفظ کرده اند. این جفت طراحی جدیدی را به عنوان
              بخشی از تعهد آدیداس به استفاده از پلی استر بازیافتی تا سال 2024
              نشان می دهد. با رویه گیاهی و زیره ای که از ضایعات لاستیکی ساخته
              شده است، هنوز هم سبکی نمادین دارند، آنها فقط با در نظر گرفتن سیاره
              ساخته شده اند.
            "
            image="./images/navbar-banner-items/stan-smith.jpg"
            route="stan-smith"
          />
        </div>
        <div className="nav-item pb-[10px] border-b-2 border-white hover:border-gray-900">
          <Link to="gazelle" className="mx-2 font-yekan text-lg select-none">
            گزل
          </Link>
          <NavbarBanner
            title="یک نسخه مدرن از کفش های کتانی معروف فوتبال."
            description="یک کلاسیک کم حاشیه. کفش گزل زندگی خود را به عنوان یک کفش فوتبال آغاز کرد و به یک کالای اصلی لباس خیابانی تبدیل شد. این جفت نسخه مورد علاقه سال 1991 را با همان مواد، رنگ ها و تناسبات کمی گسترده تر ارج نهاده است. رویه نوبوک به این کفش‌ها حسی نرم و لطیف می‌دهد."
            image="./images/navbar-banner-items/gazelle.jpg"
            route="gazelle"
          />
        </div>
        <div className="nav-item pb-[10px] border-b-2 border-white hover:border-gray-900">
          <Link to="superstar" className="mx-2 font-yekan text-lg select-none">
            سوپر استار
          </Link>
          <NavbarBanner
            title="ساق کوتاه معروف با پنجه صدفی."
            description="کفش سوپراستار آدیداس در حال حاضر یک سبک زندگی برای علاقه مندان به لباس های خیابانی است. ویژگی معروف انگشت صدفی پا باقی می ماند و سبک و محافظت را ارائه می دهد. درست مانند کاری که در زمین های بسکتبال در گذشته انجام داد."
            image="./images/navbar-banner-items/superstar.jpg"
            route="superstar"
          />
        </div>
        <div className="nav-item pb-[10px] border-b-2 border-white hover:border-gray-900">
          <Link to="ultraboost" className="mx-2 font-yekan text-lg select-none">
            الترابوست
          </Link>
          <NavbarBanner
            title="انرژی حماسی. سبک ترین."
            description="انرژی حماسی را با الترابوست Light جدید، سبک ترین الترابوست ما تا کنون تجربه کنید. جادو در زیره میانی نسل جدید آدیداس الترابوست نهفته است. طراحی منحصر به فرد مولکولی آن سبک ترین فوم الترابوست را تا به امروز به دست می آورد و ردپای کربن 10 درصد کمتری نسبت به مدل های قبلی دارد."
            image="./images/navbar-banner-items/ultraboost.jpg"
            route="ultraboost"
          />
        </div>
        <div className="nav-item pb-[10px] border-b-2 border-white hover:border-gray-900">
          <Link to="runfalcon" className="mx-2 font-yekan text-lg select-none">
            ران فالکن
          </Link>
          <NavbarBanner
            title="کفش‌های دویدن بالشتک‌دار که تا حدی با مواد بازیافتی ساخته شده‌اند."
            description="با این کفش‌های دویدن همه کاره آدیداس برای دویدن در پارک یا پیاده‌روی به سمت کافی‌شاپ بند بزنید. به لطف زیره میانی Cloudfoam، از همان لحظه ای که وارد می شوید، احساس خوبی دارند. رویه نساجی احساس راحتی و تنفس می کند و زیره لاستیکی آن چسبندگی زیادی را برای قدم زدن مطمئن به شما می دهد."
            image="./images/navbar-banner-items/runfalcon.jpg"
            route="runfalcon"
          />
        </div>
      </div>
      <div className="col-span-4 lg:col-span-2 flex justify-end items-end lg:items-end gap-2 lg:gap-4">
        <div className="pb-1 lg:pb-[10px]">
          <button className="text-2xl lg:text-3xl hover:cursor-pointer">
            <MdSearch />
          </button>
        </div>
        <div className="lg:hidden pb-1 lg:pb-[10px]">
          <button
            className="text-2xl lg:text-3xl relative"
            onClick={() => {
              !localStorage.getItem("token")
                ? setActiveLoginModal(!activeLoginModal)
                : navigate("cart");
            }}
          >
            <IoBagOutline />
            {user.cart.length > 0 && (
              <span className="bg-red-600 text-white rounded-full absolute font-yekan px-[6px] py-1 top-3 lg:top-4 left-3 lg:left-4 text-[10px]/[10px] lg:text-[12px]/[12px]">
                {totalAmount}
              </span>
            )}
          </button>
        </div>
        <div className="cart-button hidden lg:block pb-1 lg:pb-[10px]">
          <button
            className="text-2xl lg:text-3xl relative"
            onClick={() => {
              !localStorage.getItem("token")
                ? setActiveLoginModal(!activeLoginModal)
                : navigate("cart");
            }}
          >
            <IoBagOutline />
            {user.cart.length > 0 && (
              <span className="bg-red-600 text-white rounded-full absolute font-yekan px-[6px] py-1 top-3 lg:top-4 left-3 lg:left-4 text-[10px]/[10px] lg:text-[12px]/[12px]">
                {totalAmount}
              </span>
            )}
          </button>
          {user.cart.length > 0 && <CartModal />}
        </div>
        <div className="pb-1 lg:pb-[10px]">
          <button
            className="text-2xl lg:text-3xl"
            onClick={() => {
              !localStorage.getItem("token")
                ? setActiveLoginModal(!activeLoginModal)
                : navigate("profile");
            }}
          >
            <BsPerson />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
