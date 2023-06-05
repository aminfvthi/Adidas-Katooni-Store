import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Header = () => {
  const [activeSidebar, setActivesidebar] = useState<Boolean>(false);

  return (
    <>
      <Navbar
        activeSidebar={activeSidebar}
        setActivesidebar={setActivesidebar}
      />
      <Sidebar
        activeSidebar={activeSidebar}
        setActivesidebar={setActivesidebar}
      />
    </>
  );
};

export default Header;
