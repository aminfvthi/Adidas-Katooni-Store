import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { BiTrash } from "react-icons/bi";

const Favorites = () => {
  const { user, removeFromFavorites } = useUserContext();

  return (
    <div className="p-2 md:p-8 md:grid md:grid-cols-12 md:gap-8">
      {user.favorites.length > 0 ? (
        user.favorites.map((product) => (
          <div key={product._id} className="font-yekan py-2 md:col-span-6">
            <div className="flex gap-3 md:flex-col">
              <img className="w-1/2 md:w-full" src={product.image} alt="" />
              <div className="w-1/2 pt-6 flex flex-col items-start md:w-full md:pt-0 md:flex-row md:justify-between ">
                <span className="font-bold text-lg">{product.name}</span>
                <span>{product.price.toLocaleString()} تومان</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button
                className="flex justify-center items-center gap-2 border py-2 md:py-3 px-5 border-gray-900"
                onClick={() => removeFromFavorites(product._id)}
              >
                <BiTrash className="text-lg" />
                <span>حذف</span>
              </button>
              <Link
                to={
                  product.category == "stansmith"
                    ? `/stan-smith/${product._id}`
                    : `/${product.category}/${product._id}`
                }
                className="border-b border-l border-gray-900 w-full pl-[2px] pb-[2px]"
              >
                <div className="flex justify-center items-center py-2 md:py-3 bg-gray-900">
                  <span className="font-yekan text-white">مشاهده محصول</span>
                </div>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center font-yekan text-lg pt-16 md:col-span-12">
          <span>لیست کالا های مورد علاقه شما خالی می باشد!</span>
        </div>
      )}
    </div>
  );
};

export default Favorites;
