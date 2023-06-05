import { Key, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiTrash, BiEdit } from "react-icons/bi";
import { ICustomer } from "../types/CustomerInterface";

const Customers = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [wantToDelete, setWantToDelete] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Key | undefined>(
    undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/api/users/");
      setCustomers(response.data);
    };
    fetch();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${selectedCustomer}`);
      setWantToDelete(false);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-300 min-h-full p-5 lg:p-12 flex justify-center items-start">
      <div className="bg-white w-full rounded-md max-w-[1300px]">
        <div className="border-b p-5">
          <span className="font-yekan font-bold text-lg">لیست مشتریان</span>
        </div>
        <div className="overflow-scroll">
          <div className="w-[920px] lg:w-full">
            <div className="grid grid-cols-12 bg-gray-100 py-5 px-5 border-b font-yekan font-semibold text-lg">
              <div className="col-span-2">
                <span>نام</span>
              </div>
              <div className="col-span-2">
                <span>نام خانوادگی</span>
              </div>
              <div className="col-span-3">
                <span>ایمیل</span>
              </div>
              <div className="col-span-3">
                <span>آیدی</span>
              </div>
              <div className="col-span-1 mx-auto">
                <span>ویرایش</span>
              </div>
              <div className="col-span-1 mx-auto">
                <span>حذف</span>
              </div>
            </div>
            {customers.map((customer) => (
              <div
                key={customer._id}
                className="grid grid-cols-12 py-5 px-5 border-b"
              >
                <div className="col-span-2 font-yekan">
                  <span>{customer.firstName}</span>
                </div>
                <div className="col-span-2 font-yekan">
                  <span>{customer.lastName}</span>
                </div>
                <div className="col-span-3">
                  <span>{customer.email}</span>
                </div>
                <div className="col-span-3">
                  <span>{customer._id}</span>
                </div>
                <div className="col-span-1 mx-auto">
                  <button
                    onClick={() => navigate(`/edit-customer/${customer._id}`)}
                    className="text-gray-700 text-xl"
                  >
                    <BiEdit />
                  </button>
                </div>
                <div className="col-span-1 mx-auto">
                  <button
                    onClick={() => {
                      setSelectedCustomer(customer._id);
                      setWantToDelete(true);
                    }}
                    className="text-gray-700 text-xl"
                  >
                    <BiTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {wantToDelete && (
        <div
          style={{ backgroundColor: "rgba(0.25, 0.25, 0.25, 0.5)" }}
          className="fixed top-0 right-0 w-screen h-screen flex justify-center"
        >
          <div className="font-yekan absolute top-36 w-80 h-40 p-5 flex flex-col justify-between bg-white rounded-md shadow-xl">
            <span className="self-center">
              حساب کاربری مشتری مورد نظر به صورت دائم حذف خواهد شد. آیا ادامه می
              دهید؟
            </span>
            <div className="flex justify-between items-center gap-3 mt-5">
              <button
                onClick={handleDelete}
                className="w-full py-2 rounded-md text-white bg-red-700"
              >
                حذف کاربر
              </button>
              <button
                onClick={() => {
                  setSelectedCustomer(undefined);
                  setWantToDelete(false);
                }}
                className="w-full py-2 rounded-md text-white bg-gray-500"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
