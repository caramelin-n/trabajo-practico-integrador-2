import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userControllers.js";
import admin from "../middlewares/adminMiddleware.js";
import auth from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get("/users", admin, auth, getAllUsers);
userRouter.get("/users/:id", admin, auth, getUserById);
userRouter.put("/users/:id", admin, auth, updateUser);
userRouter.delete("/users/:id", admin, auth, deleteUser);

export default userRouter;