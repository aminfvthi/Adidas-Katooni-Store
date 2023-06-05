import {
  ReactNode,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  Key,
} from "react";
import { IUser, IFavorite, ICart } from "../types/UserInterface";
import axios from "axios";

interface IUserContext {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  favorites: IFavorite[];
  cart: ICart[];
  removeFromFavorites: (id: Key) => void;
  removeFromCart: (id: Key) => void;
  updateUser: () => void;
}

interface Iprops {
  children: ReactNode;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserContextProvider = ({ children }: Iprops): JSX.Element => {
  const [user, setUser] = useState<IUser>({
    firstName: "",
    lastName: "",
    email: "",
    favorites: [],
    cart: [],
  } as IUser);

  let favorites: IFavorite[] = user.favorites;
  let cart: ICart[] = user.cart;

  const removeFromFavorites = (id: Key) => {
    const filteredArray = user.favorites.filter((product) => {
      return product._id != id;
    });
    favorites.length = 0;
    filteredArray.map((product) => favorites.push(product));
    updateUser();
  };

  const removeFromCart = (id: Key) => {
    const filteredArray = user.cart.filter((product) => {
      return product._id != id;
    });
    cart.length = 0;
    filteredArray.map((product) => cart.push(product));
    updateUser();
  };

  const updateUser = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/users/user",
        { favorites, cart },
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const value: IUserContext = {
    user,
    setUser,
    favorites,
    cart,
    removeFromFavorites,
    removeFromCart,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
