import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

const EditCustomer = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await axios.get(`http://localhost:3000/api/users/${id}`);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
    };
    fetch();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsFetching(true);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/${id}`,
        {
          firstName,
          lastName,
          email,
        }
      );
      navigate("/customers");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setUpdateError(error.response?.data.massage);
        setIsFetching(false);
      } else {
        setIsFetching(false);
      }
    }
  };

  return (
    <div className="bg-zinc-300 min-h-full p-5 lg:p-12 flex justify-center items-start">
      <div className="bg-white w-full rounded-md max-w-[720px]">
        <div className="border-b p-5">
          <span className="font-yekan font-bold text-lg">
            ویرایش اطلاعات مشتری
          </span>
        </div>
        <div>
          <form
            className="p-5 lg:p-12 space-y-8"
            onSubmit={(event) => handleSubmit(event)}
          >
            <div className="flex flex-col items-start gap-2">
              <label className="font-yekan" htmlFor="firstName">
                نام مشتری
              </label>
              <input
                className="font-yekan w-full p-3 outline outline-2 rounded-sm outline-gray-200"
                type="text"
                name="firstName"
                value={firstName}
                placeholder="نام مشتری را وارد کنید"
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label className="font-yekan" htmlFor="lastName">
                نام خانوادگی مشتری
              </label>
              <input
                className="font-yekan w-full p-3 outline outline-2 rounded-sm outline-gray-200"
                type="text"
                name="lastName"
                value={lastName}
                placeholder="نام خانوادگی مشتری را وارد کنید"
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label className="font-yekan" htmlFor="email">
                ایمیل مشتری
              </label>
              <input
                className="font-yekan w-full p-3 outline outline-2 rounded-sm outline-gray-200"
                type="email"
                name="email"
                value={email}
                placeholder="ایمیل مشتری را وارد کنید"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <button
                disabled={isFetching}
                type="submit"
                className="w-full bg-zinc-800 text-white mt-3 py-3 text-lg font-yekan rounded-md"
              >
                ویرایش اطلاعات مشتری
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
