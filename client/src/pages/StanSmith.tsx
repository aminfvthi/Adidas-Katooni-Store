import { useState, useEffect } from "react";
import { IProduct } from "../types/ProductInterface";
import { ProductCard } from "../components";
import axios from "axios";

const StanSmith = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/products/stan-smith"
      );
      setProducts(response.data);
    };
    fetch();
  }, []);

  return (
    <>
      <div className="w-full mt-12 lg:mt-20">
        <img
          src="/images/stan-smith/stan-smith-banner-sm.jpg"
          className="w-full lg:hidden"
        />
        <img
          src="/images/stan-smith/stan-smith-banner-lg.jpg"
          className="w-full hidden lg:block"
        />
      </div>
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 my-4 lg:my-12 px-2 sm:px-4 lg:px-16 xl:px-48">
        <div className="mt-2 px-4 lg:col-span-8">
          <p className="text-justify text-md lg:text-xl font-yekan">
            با طیف وسیعی از کفش های استن اسمیت آدیداس از راحتی برتر لذت ببرید.
            طراحی سبک وزن تضمین میکنه که همیشه یک قدم جلوتر هستید در حالی که
            کفی پیشرفته این کفش شما رو برای مدت طولانی‌ تری روی پای خودتون نگه
            می‌ داره.
          </p>
        </div>
        <div className="flex justify-end items-center lg:col-span-4 px-4">
          <h1 className="inline lg:block text-3xl lg:text-4xl font-medium border-b-2">
            Stan Smith
          </h1>
        </div>
      </div>
      <div className="w-full grid grid-cols-12 gap-1 px-2 sm:px-4 lg:px-16 xl:px-48">
        {products.map((product) => {
          return (
            <ProductCard
              key={product._id}
              _id={product._id}
              available={product.available}
              category={"stan-smith"}
              name={product.name}
              images={product.images}
              gender={product.gender}
              price={product.price}
            />
          );
        })}
      </div>
      <div className="mt-12 lg:px-16 xl:px-48">
        <img
          src="/images/stan-smith/stan-smith-banner-2-lg.jpg"
          className="w-full hidden lg:block mb-12"
        />
        <img
          src="/images/stan-smith/stan-smith-banner-2-sm.jpg"
          className="w-full lg:hidden mb-12"
        />
      </div>
    </>
  );
};

export default StanSmith;
