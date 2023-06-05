import { useState, useEffect } from "react";
import { IProduct } from "../types/ProductInterface";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);
    };
    fetch();
  }, []);

  return (
    <div className="w-full mt-12 lg:mt-20">
      <img src="/images/" className="w-full lg:hidden" />
      <img
        src="/images/banners/banner-1-lg.jpg"
        className="w-full hidden lg:block"
      />
    </div>
  );
};

export default Home;
