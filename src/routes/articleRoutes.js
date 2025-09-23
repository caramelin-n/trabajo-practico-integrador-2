import { Router } from "express";
import auth from "../middlewares/authMiddleware.js";
import { createArticle, getAllArticles, getArticleById, getArticleUser } from "../controllers/articleControllers.js";
import { ownerAdminArticle } from "../middlewares/ownerOrAdminMiddleware.js";

const articleRouter = Router();

articleRouter.post("/articles", auth, createArticle);
articleRouter.get("/articles", auth, getAllArticles);
articleRouter.get("/articles/my", ownerAdminArticle, auth, getArticleUser);
articleRouter.get("/articles/:id", ownerAdminArticle, auth, getArticleById);

export default articleRouter;