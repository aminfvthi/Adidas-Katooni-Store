import { useState, useEffect } from "react";
import { SingleProductImageSlider } from "../components";
import { useParams } from "react-router-dom";
import { IProduct } from "../types/ProductInterface";
import { BiHeart, BiTrash } from "react-icons/bi";
import { useLoginModalContext } from "../contexts/LoginModalContext";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";

const defaultState = {
  _id: "",
  name: "",
  description: "",
  category: "",
  gender: [],
  sizes: [],
  color: "",
  images: [],
  available: false,
  price: 0,
};

const Product = () => {
  const { activeLoginModal, setActiveLoginModal } = useLoginModalContext();
  const { user, updateUser, favorites, cart, removeFromFavorites } =
    useUserContext();
  const [product, setProduct] = useState<IProduct>(defaultState);
  const [amount, setAmount] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<number>(0);

  const { id } = useParams();

  const addTofavorites = () => {
    favorites.push({
      _id: product._id,
      name: product.name,
      category: product.category,
      image: product.images[0],
      price: product.price,
    });
    updateUser();
  };

  const addToCart = () => {
    if (selectedSize == 0) return;
    cart.push({
      _id: product._id,
      name: product.name,
      image: product.images[0],
      amount: amount,
      size: selectedSize,
      price: product.price,
    });
    updateUser();
    setAmount(1);
    setSelectedSize(0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/products/${id}`
      );
      setProduct(response.data);
    };
    fetch();
  }, []);

  return (
    <>
      <div className="min-h-screen mt-12 lg:mt-20">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 xl:px-48 ">
          <div className="flex flex-col items-start font-yekan py-5 lg:py-16 xl:py-28 xl:pl-20 lg:col-span-5">
            <span className="text-xl xl:text-3xl font-bold px-8 sm:px-20 md:px-40 lg:px-20 xl:px-0">
              کفش {product.name}
            </span>
            <div className="w-full flex flex-col items-start py-7 px-8 sm:px-20 md:px-40 lg:px-20 xl:px-0 xl:text-xl ">
              <span className="text-gray-600 mb-2">
                مناسب:{" "}
                <span className="text-gray-900">
                  {product.gender[0] == "kids" ? "کودکان" : "آقایان/خانم ها"}
                </span>
              </span>
              <span className="text-gray-600">
                رنگ: <span className="text-gray-900">{product.color}</span>
              </span>
            </div>
            <div className="w-full py-8 px-8 sm:px-20 md:px-40 lg:px-20 xl:px-0 border-t">
              <span className="text-lg xl:text-xl">انتخاب سایز:</span>
              <div
                style={{ direction: "ltr" }}
                className="w-full grid grid-cols-12 mt-2"
              >
                {product.sizes.map((size) => {
                  return (
                    <button
                      className={
                        selectedSize == size
                          ? "col-span-3 sm:col-span-2 lg:col-span-3 xl:col-span-2 flex justify-center items-center p-4 text-lg border select-none hover:cursor-pointer bg-gray-900 text-white"
                          : "col-span-3 sm:col-span-2 lg:col-span-3 xl:col-span-2 flex justify-center items-center p-4 text-lg border select-none hover:cursor-pointer"
                      }
                      onClick={() => setSelectedSize(size)}
                      key={size}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="hidden lg:flex w-full justify-between items-center py-8 px-20 xl:px-0">
              {product.available ? (
                <span className="text-xl font-bold py-1">
                  قیمت:{" "}
                  {`${
                    amount > 1
                      ? (product.price * amount).toLocaleString()
                      : product.price.toLocaleString()
                  } تومان`}
                </span>
              ) : (
                <span className="text-xl font-bold py-1 text-red-600">
                  نا موجود
                </span>
              )}
              {selectedSize > 0 && amount > 0 && (
                <div className="flex justify-between items-center w-24 gap-4 py-1 px-3  bg-gray-100 rounded-sm select-none text-lg ">
                  <button onClick={() => setAmount(amount + 1)}>+</button>
                  <span>{amount}</span>
                  <button
                    onClick={() => {
                      if (amount === 1) {
                        setSelectedSize(0);
                        return;
                      }
                      setAmount(amount - 1);
                    }}
                  >
                    {amount > 1 ? "-" : <BiTrash />}
                  </button>
                </div>
              )}
            </div>
            <div className="hidden lg:flex justify-center items-center w-full gap-5 px-20 xl:px-0">
              <button
                className={
                  user.favorites.some((element) => element._id === product._id)
                    ? "border text-lg p-4 border-gray-900 text-white bg-gray-900"
                    : "border text-lg p-4 border-gray-900"
                }
                onClick={() => {
                  !localStorage.getItem("token")
                    ? setActiveLoginModal(!activeLoginModal)
                    : user.favorites.some(
                        (element) => element._id === product._id
                      )
                    ? removeFromFavorites(product._id)
                    : addTofavorites();
                }}
              >
                <BiHeart />
              </button>
              <button
                disabled={!product.available}
                type="submit"
                className="border-b border-l border-gray-900 w-full pl-[2px] pb-[2px] disabled:opacity-40"
                onClick={() => {
                  !localStorage.getItem("token")
                    ? setActiveLoginModal(!activeLoginModal)
                    : addToCart();
                }}
              >
                <div className="flex justify-center items-center py-3 bg-gray-900">
                  <span className="font-yekan text-white">
                    افزودن به سبد خرید
                  </span>
                </div>
              </button>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div
              style={{ direction: "ltr" }}
              className="w-full sm:px-20 md:px-40 lg:px-10 xl:px-20 sm:mt-10 lg:mt-16"
            >
              <SingleProductImageSlider images={product.images} />
            </div>
          </div>
        </div>
      </div>
      <div className="product-page-bottom-nav fixed bg-white bottom-0 right-0 w-full pb-16 font-yekan lg:hidden">
        <div className="flex justify-between items-center py-8 px-8 sm:px-20 md:px-40">
          {product.available ? (
            <span className="text-xl font-bold py-1">
              قیمت:{" "}
              {`${
                amount > 1
                  ? (product.price * amount).toLocaleString()
                  : product.price.toLocaleString()
              } تومان`}
            </span>
          ) : (
            <span className="text-xl font-bold py-1 text-red-600">
              نا موجود
            </span>
          )}
          {selectedSize > 0 && amount > 0 && (
            <div className="flex justify-between items-center w-24 gap-4 py-1 px-3 bg-gray-100 rounded-sm select-none text-lg sm:text-xl">
              <button
                onClick={() => {
                  setAmount(amount + 1);
                }}
              >
                +
              </button>
              <span>{amount}</span>
              <button
                onClick={() => {
                  if (amount === 1) {
                    setSelectedSize(0);
                    return;
                  }
                  setAmount(amount - 1);
                }}
              >
                {amount > 1 ? "-" : <BiTrash />}
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-center items-center w-full px-8 sm:px-20 md:px-40 gap-5">
          <button
            className={
              user.favorites.some((element) => element._id === product._id)
                ? "border text-lg p-4 border-gray-900 text-white bg-gray-900"
                : "border text-lg p-4 border-gray-900"
            }
            onClick={() => {
              !localStorage.getItem("token")
                ? setActiveLoginModal(!activeLoginModal)
                : user.favorites.some((element) => element._id === product._id)
                ? removeFromFavorites(product._id)
                : addTofavorites();
            }}
          >
            <BiHeart />
          </button>
          <button
            disabled={!product.available}
            type="submit"
            className="border-b border-l border-gray-900 w-full pl-[2px] pb-[2px] disabled:opacity-40"
            onClick={() => {
              !localStorage.getItem("token")
                ? setActiveLoginModal(!activeLoginModal)
                : addToCart();
            }}
          >
            <div className="flex justify-center items-center py-3 bg-gray-900">
              <span className="font-yekan text-white">افزودن به سبد خرید</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
