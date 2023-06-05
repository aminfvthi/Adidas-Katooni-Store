import { Dispatch, SetStateAction } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineBell, AiOutlineMail } from "react-icons/ai";

interface IProps {
  activeSidebar: boolean;
  setActiveSidebar: Dispatch<SetStateAction<boolean>>;
  setActiveMobileSidebar: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({
  activeSidebar,
  setActiveSidebar,
  setActiveMobileSidebar,
}: IProps) => {
  return (
    <div className="sticky top-0 w-full h-14 p-3 xl:p-5 flex justify-between items-center bg-zinc-800 opacity-95 drop-shadow-xl">
      <div className="flex items-center">
        <button
          onClick={() => setActiveSidebar(!activeSidebar)}
          className="hidden xl:block text-white text-3xl"
        >
          <RxHamburgerMenu />
        </button>
        <button
          onClick={() => setActiveMobileSidebar(true)}
          className="xl:hidden text-white text-3xl"
        >
          <RxHamburgerMenu />
        </button>
      </div>
      <div className="flex justify-end items-center gap-3">
        <button className="text-white text-2xl">
          <AiOutlineMail />
        </button>
        <button className="text-white text-2xl">
          <AiOutlineBell />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
