import { Link } from "react-router-dom";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useLoginModalContext } from "../contexts/LoginModalContext";
import { useUserContext } from "../contexts/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";

type SubmitForm = {
  email: string;
  password: string;
};

const LoginModal = () => {
  const { activeLoginModal, setActiveLoginModal } = useLoginModalContext();
  const { setUser } = useUserContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("لطفا ایمیل خود را به صورت صحیح وارد کنید")
      .required("لطفا ایمیل خود را وارد کنید"),
    password: yup
      .string()
      .required("لطفا رمز خود را وارد کنید")
      .min(4, "رمز وارد شده باید حداقل چهار حرف باشد")
      .max(15, "رمز وارد شده باید حداکثر پانزده حرف باشد"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitForm>({
    resolver: yupResolver(loginValidationSchema),
  });

  const submitForm = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("_id", response.data._id);
      setUser({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        favorites: response.data.favorites,
        cart: response.data.cart,
      });
      setEmail("");
      setPassword("");
      setIsFetching(false);
      setActiveLoginModal(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoginError(error.response?.data.massage);
        setIsFetching(false);
      } else {
        setIsFetching(false);
      }
    }
  };

  return (
    activeLoginModal && (
      <div
        style={{ backgroundColor: "rgba(0.25, 0.25, 0.25, 0.7)" }}
        className="z-50 w-screen h-screen fixed top-0 flex justify-center items-center"
      >
        {(loginError !== null ||
          errors.email?.message ||
          errors.password?.message) && (
          <div className="absolute top-24 w-11/12 sm:w-7/12 md:w-6/12 lg:w-4/12 xl:w-3/12 rounded-md bg-red-500 text-white drop-shadow-xl font-yekan py-3 px-5 space-y-2">
            {errors.email?.message && (
              <span className="block">{errors.email.message}</span>
            )}
            {errors.password?.message && (
              <span className="block">{errors.password.message}</span>
            )}
            {loginError !== null && <span className="block">{loginError}</span>}
          </div>
        )}
        <div className="w-11/12 sm:w-7/12 md:w-6/12 lg:w-4/12 xl:w-3/12 bg-white px-5 py-7">
          <div className="mb-3">
            <button
              className="text-3xl hover:cursor-pointer"
              onClick={() => setActiveLoginModal(!activeLoginModal)}
            >
              <MdClose />
            </button>
          </div>
          <div className="flex justify-center items-center mb-8">
            <span className="font-yekan font-bold text-xl">
              ورود به حساب کاربری
            </span>
          </div>
          <div>
            <form
              action="login"
              onSubmit={handleSubmit(submitForm)}
              className="flex flex-col gap-5 mb-3"
            >
              <input
                placeholder="ایمیل"
                type="email"
                className="font-yekan p-3 outline outline-2 outline-gray-300"
                value={email}
                {...register("email", {
                  onChange: (event) => setEmail(event.target.value),
                })}
              />
              <input
                placeholder="رمز عبور"
                type="password"
                className="font-yekan p-3 outline outline-2 outline-gray-300"
                value={password}
                {...register("password", {
                  onChange: (event) => setPassword(event.target.value),
                })}
              />
              <button
                disabled={isFetching}
                type="submit"
                className="font-yekan w-full py-2 bg-gray-900 text-white text-xl outline outline-2 outline-gray-900"
              >
                ورود
              </button>
              <Link
                to="register"
                type="submit"
                className="font-yekan w-full py-2 flex justify-center outline outline-2 outline-gray-500 text-gray-900 mt-6 text-xl hover:outline-gray-900 hover:bg-gray-900 hover:text-white transition duration-75"
                onClick={() => setActiveLoginModal(!activeLoginModal)}
              >
                ایجاد حساب جدید
              </Link>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default LoginModal;
