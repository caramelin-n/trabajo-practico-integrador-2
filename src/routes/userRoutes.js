import { Router } from "express";
import { getAllUsers } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.get("/users", getAllUsers);

export default userRouter;