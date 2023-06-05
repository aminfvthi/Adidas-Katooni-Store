import { useState, useEffect } from "react";
import { IProduct } from "../types/ProductInterface";
import { ProductCard } from "../components";
import axios from "axios";

const Gazelle = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/products/gazelle"
      );
      setProducts(response.data);
    };
    fetch();
  }, []);

  return (
    <>
      <div className="w-full mt-12 lg:mt-20">
        <img
          src="/images/gazelle/gazelle-banner-sm.jpg"
          className="w-full lg:hidden"
        />
        <img
          src="/images/gazelle/gazelle-banner-lg.jpg"
          className="w-full hidden lg:block"
        />
      </div>
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 my-4 lg:my-12 px-2 sm:px-4 lg:px-16 xl:px-48">
        <div className="mt-2 px-4 lg:col-span-8">
          <p className="text-justify text-md lg:text-xl font-yekan">
            یه کلاسیک کم حاشیه. کفش گزل زندگی خودش رو به عنوان یه کفش تمرینی
            فوتبال آغاز کرد و به یه کالای اصلی لباس خیابونی تبدیل شد. رویه نوبوک
            به این کفش‌ها حسی نرم و لطیف میده.
          </p>
        </div>
        <div className="flex justify-end items-center lg:col-span-4 px-4">
          <h1 className="inline lg:block text-3xl lg:text-4xl font-medium border-b-2">
            Gazelle
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
            <img src="/images/gazelle/gazelle-banner-2-lg-1.jpg" />
          </div>
          <div className="col-span-4">
            <img
              src="/images/gazelle/gazelle-banner-2-lg-2.jpg"
              className="translate-y-10"
            />
          </div>
          <div className="col-span-4">
            <img src="/images/gazelle/gazelle-banner-2-lg-3.jpg" />
          </div>
        </div>
        <img
          src="/images/gazelle/gazelle-banner-2-sm.jpg"
          className="w-full lg:hidden mb-12"
        />
      </div>
    </>
  );
};

export default Gazelle;
