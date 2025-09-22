import { Router } from "express";
import { authLogin, authLogout, authRegister, getProfile, updateProfile } from "../controllers/authControllers.js";
import auth from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", authRegister);
authRouter.post("/login", authLogin);
authRouter.get("/profile", auth, getProfile);
authRouter.put("/profile/:id", auth, updateProfile);
authRouter.post("/logout", auth, authLogout);

export default authRouter;