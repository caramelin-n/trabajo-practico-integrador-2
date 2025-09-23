import { Router } from "express";
import userRouter from "./userRoutes.js";
import authRouter from "./authRoutes.js";
import articleRouter from "./articleRoutes.js";
import commentRouter from "./commentRoutes.js";



const allRouter = Router();


allRouter.use(userRouter, authRouter, articleRouter, commentRouter);


export default allRouter;