import express from "express";
import Controller from "./Controller.js";
import { isLoggedIn } from "../../middlewares/isLoggedIn.js";

const router = express.Router();

router.get("/", Controller.getUsers);
router.get("/user", isLoggedIn, Controller.getUser);
router.put("/user", isLoggedIn, Controller.updateUser);
router.get("/:id", Controller.getUserByAdmin);
router.put("/:id", Controller.updateUserByAdmin);
router.delete("/:id", Controller.deleteUser);

export { router as usersRouter };
