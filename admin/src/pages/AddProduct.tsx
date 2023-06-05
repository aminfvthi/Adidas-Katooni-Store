import { useEffect, useState } from "react";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";

type SubmitForm = {
  name: string;
  description: string;
  category: string;
  gender: string[];
  sizes: number[];
  color: string;
  images: string[];
  available: boolean;
  price: number;
};

const AddProduct = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [category, setCategory] = useState<string>("category");
  const [price, setPrice] = useState<string>("");
  const [gender, setGender] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [size, setSize] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [kidsChecked, setKidsChecked] = useState<boolean>(false);
  const [menChecked, setMenChecked] = useState<boolean>(false);
  const [womenChecked, setWomenChecked] = useState<boolean>(false);
  const [postError, setPostError] = useState<string | null>(null);
  const [postErrors, setPostErrors] = useState<[] | null>(null);
  const [genderError, setGenderError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [sizesError, setSizesError] = useState<string | null>(null);
  const [imagesError, setImagesError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const navigate = useNavigate();

  const postValidationSchema = yup.object().shape({
    name: yup.string().required("لطفا نام محصول را وارد کنید"),
    description: yup.string().required("لطفا توضیحات محصول را وارد کنید"),
    color: yup.string().required("لطفا رنگ محصول را وارد کنید"),
    price: yup.number().required("لطفا قیمت محصول را وارد کنید"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitForm>({
    resolver: yupResolver(postValidationSchema),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitForm = async () => {
    if (
      category === "category" ||
      gender.length == 0 ||
      selectedSizes.length == 0 ||
      selectedImages.length == 0
    ) {
      if (category === "category") {
        setCategoryError("یکی از دسته بندی های زیر را انتخاب کنید");
      }
      if (gender.length == 0) {
        setGenderError("حداقل یکی از گزینه های زیر را انتخاب کنید");
      }
      if (selectedSizes.length == 0) {
        setSizesError("حداقل یک سایز به لیست سایز های محصول اضافه کنید");
      }
      if (selectedImages.length == 0) {
        setImagesError("حداقل یک عکس به لیست تصاویر محصول اضافه کنید");
      }
      return;
    }
    setIsFetching(true);
    try {
      const response = await axios.post("http://localhost:3000/api/products/", {
        name,
        description,
        category,
        gender,
        sizes: selectedSizes.sort(),
        color,
        images: selectedImages,
        available: true,
        price: parseInt(price),
      });
      setName("");
      setDescription("");
      setCategory("category");
      setGender([]);
      setSelectedSizes([]);
      setColor("");
      setSelectedImages([]);
      setPrice("");
      navigate("/products");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setPostError(error.response?.data.massage);
        setPostErrors(error.response?.data.data);
        setIsFetching(false);
      } else {
        setIsFetching(false);
      }
    }
  };

  const handleChange = (
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    value: string
  ) => {
    if (gender.includes(value)) {
      const filteredGenders = gender.filter((item) => {
        return item !== value;
      });
      setGender([]);
      setGender(filteredGenders);
      setState(!state);
      return;
    }
    setState(!state);
    setGender([...gender, value]);
    setGenderError(null);
  };

  return (
    <div className="bg-zinc-300 min-h-full p-5 lg:p-12 flex justify-center items-start">
      {postError !== null && (
        <div className="fixed md:top-32 w-11/12 sm:w-7/12 md:w-6/12 lg:w-4/12 xl:w-3/12 rounded-md bg-red-600 text-white drop-shadow-xl font-yekan py-3 px-5 space-y-2">
          {postError !== null && (
            <span className="block text-lg">{postError}</span>
          )}
          {postErrors?.map((error) => (
            <span className="block">{error}</span>
          ))}
        </div>
      )}
      <div className="bg-white w-full rounded-md max-w-[720px]">
        <div className="border-b p-5">
          <span className="font-yekan font-bold text-lg">
            افزودن محصول جدید
          </span>
        </div>
        <div>
          <form
            className="p-5 lg:p-12 space-y-8"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="flex flex-col items-start gap-2">
              <label className="font-yekan" htmlFor="name">
                نام محصول
              </label>
              <input
                className={
                  errors.name?.message
                    ? "font-yekan w-full p-3 outline outline-2 rounded-sm outline-red-600"
                    : "font-yekan w-full p-3 outline outline-2 rounded-sm outline-gray-200"
                }
                type="text"
                value={name}
                placeholder="نام محصول را وارد کنید"
                {...register("name", {
                  onChange: (event) => setName(event.target.value),
                })}
              />
              {errors.name?.message && (
                <span className="block font-yekan text-sm text-red-700">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start gap-2">
              <label className="font-yekan" htmlFor="description">
                توضیحات محصول
              </label>
              <input
                className={
                  errors.description?.message
                    ? "font-yekan w-full p-3 outline outline-2 rounded-sm outline-red-600"
                    : "font-yekan w-full p-3 outline outline-2 rounded-sm outline-gray-200"
                }
                type="text"
                value={description}
                placeholder="توضیحات محصول را وارد کنید"
                {...register("description", {
                  onChange: (event) => setDescription(event.target.value),
                })}
              />
              {errors.description?.message && (
                <span className="block font-yekan text-sm text-red-700">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start gap-2">
              <label className="font-yekan" htmlFor="color">
                رنگ محصول
              </label>
              <input
                className={
                  errors.color?.message
                    ? "font-yekan w-full p-3 outline outline-2 rounded-sm outline-red-600"
                    : "font-yekan w-full p-3 outline outline-2 rounded-sm outline-gray-200"
                }
                type="text"
                value={color}
                placeholder="رنگ محصول را وارد کنید"
                {...register("color", {
                  onChange: (event) => setColor(event.target.value),
                })}
              />
              {errors.color?.message && (
                <span className="block font-yekan text-sm text-red-700">
                  {errors.color.message}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start gap-2">
              <label className="font-yekan" htmlFor="price">
                قیمت محصول ( تومان )
              </label>
              <input
                className={
                  errors.price?.message
                    ? "font-yekan w-full p-3 outline outline-2 rounded-sm outline-red-600"
                    : "font-yekan w-full p-3 outline outline-2 rounded-sm outline-gray-200"
                }
                type="text"
                value={price}
                placeholder="قیمت محصول را وارد کنید"
                {...register("price", {
                  onChange: (event) => setPrice(event.target.value),
                })}
              />
              {errors.price?.message && (
                <span className="block font-yekan text-sm text-red-700">
                  لطفا قیمت محصول را به صورت عدد وارد کنید
                </span>
              )}
            </div>
            <div className="py-2">
              {categoryError && (
                <span className="block font-yekan text-red-700 mb-3">
                  {categoryError}
                </span>
              )}
              <div className="flex justify-between items-center gap-2">
                <label className="font-yekan" htmlFor="color">
                  دسته بندی محصول را انتخاب کنید:
                </label>
                <select
                  style={{ direction: "ltr" }}
                  className="py-2 ltr px-5 rounded-md bg-white border-2"
                  name="category"
                  id="category"
                  defaultValue={category}
                >
                  <option disabled hidden value="category">
                    دسته بندی ها
                  </option>
                  <option
                    onClick={(event) => {
                      setCategory((event.target as HTMLInputElement).value);
                      setCategoryError(null);
                    }}
                    value="stansmith"
                  >
                    stansmith
                  </option>
                  <option
                    onClick={(event) => {
                      setCategory((event.target as HTMLInputElement).value);
                      setCategoryError(null);
                    }}
                    value="gazelle"
                  >
                    gazelle
                  </option>
                  <option
                    onClick={(event) => {
                      setCategory((event.target as HTMLInputElement).value);
                      setCategoryError(null);
                    }}
                    value="superstar"
                  >
                    superstar
                  </option>
                  <option
                    onClick={(event) => {
                      setCategory((event.target as HTMLInputElement).value);
                      setCategoryError(null);
                    }}
                    value="ultraboost"
                  >
                    ultraboost
                  </option>
                  <option
                    onClick={(event) => {
                      setCategory((event.target as HTMLInputElement).value);
                      setCategoryError(null);
                    }}
                    value="runfalcon"
                  >
                    runfalcon
                  </option>
                </select>
              </div>
            </div>
            <div className="py-2">
              {genderError && (
                <span className="block font-yekan text-red-700 mb-3">
                  {genderError}
                </span>
              )}
              <div className="w-full flex justify-between items-center font-yekan">
                <span className="font-yekan mb-3">مناسب برای:</span>
                <div className="flex items-center gap-7">
                  <label
                    className="flex justify-start items-center gap-2"
                    htmlFor="men"
                  >
                    <input
                      className=""
                      type="checkbox"
                      name="men"
                      value="men"
                      checked={menChecked}
                      onChange={() =>
                        handleChange(menChecked, setMenChecked, "men")
                      }
                    />
                    <span>آقایان</span>
                  </label>
                  <label
                    className="flex justify-start items-center gap-2"
                    htmlFor="women"
                  >
                    <input
                      className=""
                      type="checkbox"
                      name="women"
                      value="women"
                      checked={womenChecked}
                      onChange={() =>
                        handleChange(womenChecked, setWomenChecked, "women")
                      }
                    />
                    <span>خانم ها</span>
                  </label>
                  <label
                    className="flex justify-start items-center gap-2"
                    htmlFor="kids"
                  >
                    <input
                      className=""
                      type="checkbox"
                      name="kids"
                      value="kids"
                      checked={kidsChecked}
                      onChange={() =>
                        handleChange(kidsChecked, setKidsChecked, "kids")
                      }
                    />
                    <span>کودکان</span>
                  </label>
                </div>
              </div>
            </div>
            <div>
              {sizesError && (
                <span className="block font-yekan text-red-700 mb-3">
                  {sizesError}
                </span>
              )}
              <div className="flex justify-between items-center gap-2">
                <label className="font-yekan" htmlFor="size">
                  سایز محصول را وارد کنید:
                </label>
                <div className="flex items-center">
                  <input
                    style={{ textDecoration: "none" }}
                    className="w-24 rounded-r-md p-2 outline-none bg-slate-100"
                    type="text"
                    name="size"
                    value={size}
                    placeholder="سایز"
                    onChange={(event) => setSize(event.target.value)}
                  />
                  <span
                    onClick={() => {
                      if (selectedSizes.includes(parseInt(size))) return;
                      selectedSizes.push(parseInt(size));
                      setSize("");
                      setSizesError(null);
                    }}
                    className="cursor-pointer p-3 rounded-l-md bg-gray-200"
                  >
                    <IoMdCheckmark />
                  </span>
                </div>
              </div>
            </div>
            {selectedSizes.length > 0 && (
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-3 ltr">
                {selectedSizes.map((selectedSize) => (
                  <div
                    key={selectedSize}
                    className="col-span-1 py-2 px-2 sm:px-3 flex justify-between items-center bg-zinc-300"
                  >
                    <span>{selectedSize}</span>
                    <span
                      onClick={() => {
                        const filteredSizes = selectedSizes.filter(
                          (selected) => {
                            return selected !== selectedSize;
                          }
                        );
                        setSelectedSizes([]);
                        setSelectedSizes(filteredSizes);
                      }}
                      className="cursor-pointer"
                    >
                      <IoMdClose />
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div>
              {imagesError && (
                <span className="block font-yekan text-red-700 mb-3">
                  {imagesError}
                </span>
              )}
              <div className="flex justify-between items-center gap-2">
                <label className="font-yekan" htmlFor="image">
                  لینک تصویر محصول را وارد کنید:
                </label>
                <div className="flex items-center">
                  <input
                    style={{ textDecoration: "none" }}
                    className="w-24 sm:w-56 rounded-r-md p-2 outline-none bg-slate-100"
                    type="text"
                    name="image"
                    value={image}
                    placeholder="لینک"
                    onChange={(event) => setImage(event.target.value)}
                  />
                  <span
                    onClick={() => {
                      if (selectedImages.includes(image)) return;
                      selectedImages.push(image);
                      setImage("");
                      setImagesError(null);
                    }}
                    className="cursor-pointer p-3 rounded-l-md bg-gray-200"
                  >
                    <IoMdCheckmark />
                  </span>
                </div>
              </div>
            </div>
            {selectedImages.length > 0 && (
              <div className="grid grid-cols-8 gap-2 sm:gap-5 ltr">
                {selectedImages.map((selectedImage, index) => (
                  <div className="col-span-2 relative" key={index}>
                    <img src={selectedImage} alt="" />
                    <span
                      onClick={() => {
                        const filteredImages = selectedImages.filter(
                          (selected) => {
                            return selected !== selectedImage;
                          }
                        );
                        setSelectedImages([]);
                        setSelectedImages(filteredImages);
                      }}
                      className="absolute top-2 right-2 cursor-pointer text-lg text-gray-700"
                    >
                      <IoMdClose />
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div>
              <button
                disabled={isFetching}
                type="submit"
                className="w-full bg-zinc-800 text-white mt-3 mb-5 py-3 text-lg font-yekan rounded-md"
              >
                ثبت محصول
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
