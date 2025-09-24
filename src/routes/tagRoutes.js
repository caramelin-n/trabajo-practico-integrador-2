import { Router } from "express";
import admin from "../middlewares/adminMiddleware.js";
import auth from "../middlewares/authMiddleware.js";
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from "../controllers/tagControllers.js";

const tagRouter = Router();

tagRouter.post("/tags", admin, auth, createTag);
tagRouter.get("/tags", auth, getAllTags);
tagRouter.get("/tags", auth, getTagById);
tagRouter.put("/tags/:id", admin, auth, updateTag);
tagRouter.delete("/tags/:id", admin, auth, deleteTag);

export default tagRouter;