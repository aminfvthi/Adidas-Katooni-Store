import autoBind from "auto-bind";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UsersModel } from "../../models/UsersModel.js";

const SECRET = "wf9y58wh4w45x97w4h5ohw4s";

export default new (class {
  constructor() {
    autoBind(this);
    this.UsersModel = UsersModel;
  }

  validationBody(req, res) {
    const resault = validationResult(req);
    if (!resault.isEmpty()) {
      const errors = resault.array();
      const massages = [];
      errors.forEach((err) => massages.push(err.msg));
      res.status(400).json({
        massage: "اطلاعات وارد شده نامعتبر می باشد",
        data: massages,
      });
      return false;
    }
    return true;
  }

  validate(req, res, next) {
    if (!this.validationBody(req, res)) {
      return;
    }
    next();
  }

  // response({ res, massage, code = 200, data = {} }) {
  //   res.status(code).json({
  //     massage,
  //     data,
  //   });
  // }

  async register(req, res) {
    const user = await UsersModel.findOne({ email: req.body.email });
    if (user) {
      res
        .status(400)
        .json({ massage: "حساب کاربری با ایمیل وارد شده از قبل وجود دارد" });
      return;
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new UsersModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(200).json({ massage: "حساب کاربری شما با موفقیت ایجاد شد" });
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }

  async login(req, res) {
    const user = await UsersModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ massage: "حساب کاربری مورد نظر وجود ندارد" });
    }
    const passwordValidation = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordValidation) {
      return res.status(400).json({ massage: "رمز وارد شده نادرست می باشد" });
    }
    try {
      const token = jwt.sign({ _id: user._id }, SECRET);
      const data = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        favorites: user.favorites,
        cart: user.cart,
        token,
      };
      res.status(200).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }
})();
