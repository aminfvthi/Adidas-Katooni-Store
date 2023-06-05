import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUserContext } from "./contexts/UserContext";
import { useEffect } from "react";
import axios from "axios";
import "./App.css";
import {
  Home,
  Register,
  Profile,
  ProfileIndex,
  Orders,
  Favortes,
  Cart,
  StanSmith,
  Gazelle,
  Superstar,
  Ultraboost,
  Runfalcon,
  Product,
} from "./pages/";
import {
  Header,
  Footer,
  LoginModal,
  ProtectedRoutes,
  BlockedRoutes,
} from "./components/";

function App() {
  const { setUser } = useUserContext();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/api/users/user", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setUser(response.data);
    };
    if (!localStorage.getItem("token")) return;
    fetch();
  }, []);

  return (
    <Router>
      <Header />
      <LoginModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<BlockedRoutes />}>
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />}>
            <Route index element={<ProfileIndex />} />
            <Route path="orders" element={<Orders />} />
            <Route path="favorites" element={<Favortes />} />
          </Route>
        </Route>
        <Route path="stan-smith" element={<StanSmith />} />
        <Route path="stan-smith/:id" element={<Product />} />
        <Route path="gazelle" element={<Gazelle />} />
        <Route path="gazelle/:id" element={<Product />} />
        <Route path="superstar" element={<Superstar />} />
        <Route path="superstar/:id" element={<Product />} />
        <Route path="ultraboost" element={<Ultraboost />} />
        <Route path="ultraboost/:id" element={<Product />} />
        <Route path="runfalcon" element={<Runfalcon />} />
        <Route path="runfalcon/:id" element={<Product />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
