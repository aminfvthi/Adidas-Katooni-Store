import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { MobileSidebar, Navbar, Sidebar } from "./components";
import {
  AddProduct,
  Calendar,
  Charts,
  Customers,
  Dashboard,
  EditCustomer,
  EditProduct,
  Financials,
  Notes,
  Orders,
  Products,
} from "./pages";
import "./App.css";

function App() {
  const [activeSidebar, setActiveSidebar] = useState<boolean>(true);
  const [activeMobileSidebar, setActiveMobileSidebar] =
    useState<boolean>(false);

  return (
    <Router>
      <div className="w-screen h-screen xl:grid xl:grid-cols-12">
        <div
          className={
            activeSidebar
              ? "col-span-0 hidden xl:block xl:col-span-2 w-full h-full"
              : "col-span-0 hidden"
          }
        >
          {activeSidebar && <Sidebar />}
        </div>
        <div
          className={
            activeSidebar
              ? "col-span-12 xl:col-span-10 w-full h-full overflow-y-scroll relative"
              : "col-span-12 w-full h-full overflow-y-scroll relative"
          }
        >
          <Navbar
            activeSidebar={activeSidebar}
            setActiveSidebar={setActiveSidebar}
            setActiveMobileSidebar={setActiveMobileSidebar}
          />
          <MobileSidebar
            activeMobileSidebar={activeMobileSidebar}
            setActiveMobileSidebar={setActiveMobileSidebar}
          />
          <div className="w-full h-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="financials" element={<Financials />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="notes" element={<Notes />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="charts" element={<Charts />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
              <Route path="edit-customer/:id" element={<EditCustomer />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
