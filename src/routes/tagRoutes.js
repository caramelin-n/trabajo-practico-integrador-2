import { Router } from "express";
import admin from "../middlewares/adminMiddleware.js";
import auth from "../middlewares/authMiddleware.js";
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from "../controllers/tagControllers.js";
import validator from "../middlewares/validator.js";
import { bodyTagValidator } from "../middlewares/validators/tagValidator.js";

const tagRouter = Router();

tagRouter.post("/tags", admin, auth, bodyTagValidator, validator, createTag);
tagRouter.get("/tags", auth, getAllTags);
tagRouter.get("/tags/:id", auth, validator, getTagById);
tagRouter.put("/tags/:id", admin, auth, bodyTagValidator, validator, updateTag);
tagRouter.delete("/tags/:id", admin, auth, validator, deleteTag);

export default tagRouter;