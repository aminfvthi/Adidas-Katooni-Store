import { useState, useEffect } from "react";
import { IProduct } from "../types/ProductInterface";
import { ProductCard } from "../components";
import axios from "axios";

const Runfalcon = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/products/runfalcon"
      );
      setProducts(response.data);
    };
    fetch();
  }, []);

  return (
    <>
      <div className="w-full mt-12 lg:mt-20">
        <img
          src="/images/runfalcon/runfalcon-banner-sm.jpg"
          className="w-full lg:hidden"
        />
        <img
          src="/images/runfalcon/runfalcon-banner-lg.jpg"
          className="w-full hidden lg:block"
        />
      </div>
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 my-4 lg:my-12 px-2 sm:px-4 lg:px-16 xl:px-48">
        <div className="mt-2 px-4 lg:col-span-8">
          <p className="text-justify text-md lg:text-xl font-yekan">
            با این کفش‌های رانینگ همه کاره آدیداس برای دویدن تو پارک یا قدم زدن
            به کافی‌شاپ بند هاتون رو ببندید. به لطف زیره میانی فومی از همون لحظه
            ای که میپوشین، احساس خوبی داره. رویه پارچه ای احساس راحتی و تنفس
            دارخ و زیره لاستیکیش چسبندگی زیادی رو برای قدم زدن مطمئن به شما
            میده.
          </p>
        </div>
        <div className="flex justify-end items-center lg:col-span-4 px-4">
          <h1 className="inline lg:block text-3xl lg:text-4xl font-medium border-b-2">
            Runfalcon
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
              category={product.category}
              name={product.name}
              images={product.images}
              gender={product.gender}
              price={product.price}
            />
          );
        })}
      </div>
      <div className="mt-12 lg:px-16 xl:px-48">
        <div className="w-full hidden lg:grid grid-cols-12 gap-5 mb-12">
          <div className="col-span-4">
            <img src="/images/runfalcon/runfalcon-banner-2-lg-1.jpg" />
          </div>
          <div className="col-span-4">
            <img
              src="/images/runfalcon/runfalcon-banner-2-lg-2.jpg"
              className="translate-y-10"
            />
          </div>
          <div className="col-span-4">
            <img src="/images/runfalcon/runfalcon-banner-2-lg-3.jpg" />
          </div>
        </div>
        <img
          src="/images/runfalcon/runfalcon-banner-2-sm.jpg"
          className="w-full lg:hidden mb-12"
        />
      </div>
    </>
  );
};

export default Runfalcon;
