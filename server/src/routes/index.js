import express from "express";
import { authRouter } from "./auth/index.js";
import { usersRouter } from "./users/index.js";
import { productsRouter } from "./products/index.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/users", usersRouter);

export { router as apiRouter };
