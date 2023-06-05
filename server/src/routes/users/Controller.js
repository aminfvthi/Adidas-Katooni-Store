import { UsersModel } from "../../models/UsersModel.js";

export default new (class {
  async getUsers(req, res) {
    try {
      const users = await UsersModel.find();
      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }

  async getUser(req, res) {
    try {
      const user = await UsersModel.findById(req.userId);
      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        favorites: user.favorites,
        cart: user.cart,
      };
      res.status(200).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }

  async getUserByAdmin(req, res) {
    const { id } = req.params;

    try {
      const user = await UsersModel.findById(id);
      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        favorites: user.favorites,
        cart: user.cart,
      };
      res.status(200).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }

  async updateUser(req, res) {
    try {
      await UsersModel.updateOne(
        { _id: req.userId },
        {
          favorites: req.body.favorites,
          cart: req.body.cart,
        }
      );
      const updatedUser = await UsersModel.findById(req.userId);
      const data = {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        favorites: updatedUser.favorites,
        cart: updatedUser.cart,
      };
      res.status(200).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }

  async updateUserByAdmin(req, res) {
    const { id } = req.params;
    try {
      await UsersModel.findByIdAndUpdate(id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      });
      res
        .status(200)
        .json({ massage: "اطلاعات مشتری با موفقیت به روز رسانی شد." });
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await UsersModel.findByIdAndDelete(id);
      res.status(200).json({ massage: "حذف محصول با موفقیت انجام شد" });
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }
})();
