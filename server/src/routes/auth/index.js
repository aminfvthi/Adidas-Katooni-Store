import express from "express";
import Validator from "./Validator.js";
import Controller from "./Controller.js";

const router = express.Router();

router.post(
  "/register",
  Validator.registerValidator(),
  Controller.validate,
  Controller.register
);
router.post(
  "/login",
  Validator.loginValidator(),
  Controller.validate,
  Controller.login
);

export { router as authRouter };
