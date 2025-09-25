import { Router } from "express";
import { authLogin, authLogout, authRegister, getProfile, updateProfile } from "../controllers/authControllers.js";
import auth from "../middlewares/authMiddleware.js";
import { bodyUserValidator } from "../middlewares/validators/userValidator.js";
import validator from "../middlewares/validator.js";

const authRouter = Router();

authRouter.post("/register", bodyUserValidator, validator, authRegister);
authRouter.post("/login", authLogin);
authRouter.get("/profile", auth, getProfile);
authRouter.put("/profile/:id", auth, bodyUserValidator, validator, updateProfile);
authRouter.post("/logout", auth, authLogout);

export default authRouter;