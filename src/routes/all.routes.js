import { Router } from "express";
import userRouter from "./userRoutes.js";
import authRouter from "./authRoutes.js";
import articleRouter from "./articleRoutes.js";



const allRouter = Router();


allRouter.use(userRouter, authRouter, articleRouter);


export default allRouter;