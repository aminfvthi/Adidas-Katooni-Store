import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { SuccessfullyRegisteredModal } from "../components";

type SubmitForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isSucceed, setIsSucceed] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const registerValidationSchema = yup.object().shape({
    firstName: yup.string().required("لطفا نام خود را وارد کنید"),
    lastName: yup.string().required("لطفا نام خانوادگی خود را وارد کنید"),
    email: yup
      .string()
      .email("لطفا ایمیل خود را به صورت صحیح وارد کنید")
      .required("لطفا ایمیل خود را وارد کنید"),
    password: yup
      .string()
      .required("لطفا رمز مورد نظر خود را وارد کنید")
      .min(4, "رمز وارد شده باید حداقل چهار حرف باشد")
      .max(15, "رمز وارد شده می تواند حداکثر پانزده حرف باشد"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitForm>({
    resolver: yupResolver(registerValidationSchema),
  });

  const submitForm = async () => {
    setIsFetching(true);
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      setFirstName("");
      setLastname("");
      setEmail("");
      setPassword("");
      setIsFetching(false);
      setIsSucceed(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setRegisterError(error.response?.data.massage);
        setIsFetching(false);
      } else {
        setIsFetching(false);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setFirstName("");
    setLastname("");
    setEmail("");
    setPassword("");
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {(registerError !== null ||
        errors.firstName?.message ||
        errors.lastName?.message ||
        errors.email?.message ||
        errors.password?.message) && (
        <div className="absolute top-16 lg:top-24 w-11/12 sm:w-7/12 md:w-6/12 lg:w-4/12 xl:w-3/12 rounded-md bg-red-600 text-white drop-shadow-xl font-yekan py-3 px-5 space-y-2">
          {errors.firstName?.message && (
            <span className="block">{errors.firstName.message}</span>
          )}
          {errors.lastName?.message && (
            <span className="block">{errors.lastName.message}</span>
          )}
          {errors.email?.message && (
            <span className="block">{errors.email.message}</span>
          )}
          {errors.password?.message && (
            <span className="block">{errors.password.message}</span>
          )}
          {registerError !== null && (
            <span className="block">{registerError}</span>
          )}
        </div>
      )}
      {isSucceed && <SuccessfullyRegisteredModal setIsSucceed={setIsSucceed} />}
      <div className="w-11/12 sm:w-7/12 md:w-6/12 lg:w-4/12 xl:w-3/12 px-5 py-7 border-2 border-gray-300">
        <div className="flex justify-center items-center mb-8">
          <span className="font-yekan font-bold text-xl">
            ایجاد حساب کاربری جدید{" "}
          </span>
        </div>
        <div>
          <form
            action="register"
            onSubmit={handleSubmit(submitForm)}
            className="flex flex-col gap-5 mb-3"
          >
            <input
              placeholder="نام"
              type="text"
              className="font-yekan p-3 outline outline-2 outline-gray-300"
              value={firstName}
              {...register("firstName", {
                onChange: (event) => setFirstName(event.target.value),
              })}
            />
            <input
              placeholder="نام خانوادگی"
              type="text"
              className="font-yekan p-3 outline outline-2 outline-gray-300"
              value={lastName}
              {...register("lastName", {
                onChange: (event) => setLastname(event.target.value),
              })}
            />
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
              ایجاد حساب
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
