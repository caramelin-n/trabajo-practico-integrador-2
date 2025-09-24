import { Router } from "express";
import { addTagArticle, deleteTagArticle } from "../controllers/articleTagControllers.js";
import { ownerAdminArticle } from "../middlewares/ownerOrAdminMiddleware.js";
import auth from "../middlewares/authMiddleware.js";

const artagRouter = Router();

artagRouter.post("/articles/:id/tags/:id",  ownerAdminArticle, auth, addTagArticle);
artagRouter.delete("/articles/:id/tags/:id", ownerAdminArticle, auth, deleteTagArticle);

export default artagRouter;