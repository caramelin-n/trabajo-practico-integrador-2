import { Router } from "express";
import userRouter from "./userRoutes.js";
import authRouter from "./authRoutes.js";
import articleRouter from "./articleRoutes.js";
import commentRouter from "./commentRoutes.js";
import tagRouter from "./tagRoutes.js";
import artagRouter from "./articleTagRoutes.js";



const allRouter = Router();


allRouter.use(userRouter, authRouter, articleRouter, commentRouter, tagRouter, artagRouter);


export default allRouter;