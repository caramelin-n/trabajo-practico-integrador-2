import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userControllers.js";
import admin from "../middlewares/adminMiddleware.js";
import auth from "../middlewares/authMiddleware.js";
import { bodyUserValidator } from "../middlewares/validators/userValidator.js";
import validator from "../middlewares/validator.js"

const userRouter = Router();

userRouter.get("/users", admin, auth, getAllUsers);
userRouter.get("/users/:id", admin, auth, validator, getUserById);
userRouter.put("/users/:id", admin, auth, bodyUserValidator, validator, updateUser);
userRouter.delete("/users/:id", admin, auth, validator, deleteUser);

export default userRouter;