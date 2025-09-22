import { Router } from "express";
import userRouter from "./userRoutes.js";
import authRouter from "./authRoutes.js";



const allRouter = Router();


allRouter.use(userRouter, authRouter);


export default allRouter;