import express from "express";
import Validator from "./Validator.js";
import Controller from "./Controller.js";

const router = express.Router();

router.get("/", Controller.getAll);
router.get("/stan-smith", Controller.getStansmith);
router.get("/gazelle", Controller.getGazelle);
router.get("/superstar", Controller.getSuperstar);
router.get("/ultraboost", Controller.getUltraboost);
router.get("/runfalcon", Controller.getRunfalcon);
router.get("/:id", Controller.getProduct);
router.post(
  "/",
  Validator.productValidator(),
  Controller.validate,
  Controller.postProduct
);
router.put(
  "/:id",
  Validator.productValidator(),
  Controller.validate,
  Controller.updateProduct
);
router.delete("/:id", Controller.deleteProduct);

export { router as productsRouter };
