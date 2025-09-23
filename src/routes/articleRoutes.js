import { Router } from "express";
import auth from "../middlewares/authMiddleware.js";
import { createArticle, getAllArticles, getArticleById, getArticleUser } from "../controllers/articleControllers.js";

const articleRouter = Router();

articleRouter.post("/articles", auth, createArticle);
articleRouter.get("/articles", auth, getAllArticles);
articleRouter.get("/articles/my", auth, getArticleUser);
articleRouter.get("/articles/:id", auth, getArticleById);

export default articleRouter;