import { Dispatch, SetStateAction } from "react";
import { useLoginModalContext } from "../contexts/LoginModalContext";
import { BsCheckSquareFill } from "react-icons/bs";

interface IProps {
  setIsSucceed: Dispatch<SetStateAction<boolean>>;
}

const SuccessfullyRegisteredModal = ({ setIsSucceed }: IProps) => {
  const { setActiveLoginModal } = useLoginModalContext();
  return (
    <div
      style={{ backgroundColor: "rgba(0.25, 0.25, 0.25, 0.7)" }}
      className="z-50 w-screen h-screen fixed top-0 flex justify-center items-center"
    >
      <div className="w-11/12 sm:w-7/12 md:w-6/12 lg:w-4/12 xl:w-3/12 h-1/2 bg-white px-5 py-28 font-yekan">
        <div className="flex justify-center items-center mb-8">
          <BsCheckSquareFill className="text-8xl text-green-600" />
        </div>
        <div className="flex items-center justify-center">
          <span className="text-xl font-extrabold">
            حساب کاربری شما با موفقیت ایجاد شد
          </span>
        </div>
        <div className="flex justify-center items-center mt-20">
          <button
            onClick={() => {
              setIsSucceed(false);
              setActiveLoginModal(true);
            }}
            className="w-full border-b border-l border-gray-900 pl-[2px] pb-[2px]"
          >
            <div className="flex justify-center items-center py-3 bg-gray-900">
              <span className="font-yekan text-white">ورود به حساب</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfullyRegisteredModal;
