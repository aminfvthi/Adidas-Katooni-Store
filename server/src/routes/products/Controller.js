import autoBind from "auto-bind";
import { validationResult } from "express-validator";
import { ProductsModel } from "../../models/ProductsModel.js";

export default new (class {
  constructor() {
    autoBind(this);
    this.ProductsModel = ProductsModel;
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

  async getAll(req, res) {
    try {
      const resault = await ProductsModel.find({});
      res.status(200).send(resault);
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }

  async getStansmith(req, res) {
    try {
      const resault = await ProductsModel.find({ category: "stansmith" });
      res.status(200).json(resault);
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }

  async getGazelle(req, res) {
    try {
      const resault = await ProductsModel.find({ category: "gazelle" });
      res.status(200).send(resault);
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }

  async getSuperstar(req, res) {
    try {
      const resault = await ProductsModel.find({ category: "superstar" });
      res.status(200).send(resault);
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }

  async getUltraboost(req, res) {
    try {
      const resault = await ProductsModel.find({ category: "ultraboost" });
      res.status(200).send(resault);
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }

  async getRunfalcon(req, res) {
    try {
      const resault = await ProductsModel.find({ category: "runfalcon" });
      res.status(200).send(resault);
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }

  async getProduct(req, res) {
    const { id } = req.params;
    try {
      const resault = await ProductsModel.findById(id);
      res.status(200).send(resault);
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }

  async postProduct(req, res) {
    const newProduct = new ProductsModel({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      gender: req.body.gender,
      sizes: req.body.sizes.sort(),
      color: req.body.color,
      images: req.body.images,
      available: req.body.available,
      price: req.body.price,
    });
    try {
      await newProduct.save();
      res.status(200).json({ massage: "محصول جدید با موفقیت ثبت گردید" });
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    try {
      await ProductsModel.findByIdAndUpdate(id, {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        gender: req.body.gender,
        sizes: req.body.sizes,
        color: req.body.color,
        images: req.body.images,
        available: req.body.available,
        price: req.body.price,
      });
      res
        .status(200)
        .json({ massage: "به روز رسانی محصول با موفقیت انجام شد" });
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      await ProductsModel.findByIdAndDelete(id);
      res.status(200).json({ massage: "حذف محصول با موفقیت انجام شد" });
    } catch (error) {
      res
        .status(500)
        .json({ massage: "ارتباط با سرور برقرار نشد. لطفا مجددا تلاش کنید." });
    }
  }
})();
