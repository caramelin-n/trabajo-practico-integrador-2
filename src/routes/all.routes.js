import { Router } from "express";
import userRouter from "./userRoutes.js";



const allRouter = Router();


allRouter.use(userRouter)


export default allRouter;