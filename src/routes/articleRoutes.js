import { Router } from "express";
import auth from "../middlewares/authMiddleware.js";
import { createArticle, deleteArticle, getAllArticles, getArticleById, getArticleUser, updateArticle } from "../controllers/articleControllers.js";
import { ownerAdminArticle } from "../middlewares/ownerOrAdminMiddleware.js";
import { createArticleValidator, updateArticleValidator } from "../middlewares/validators/articleValidator.js";
import validator from "../middlewares/validator.js";

const articleRouter = Router();

articleRouter.post("/articles", auth, createArticleValidator, validator, createArticle);
articleRouter.get("/articles", auth, getAllArticles);
articleRouter.get("/articles/my", ownerAdminArticle, auth, getArticleUser);
articleRouter.get("/articles/:id", ownerAdminArticle, auth, validator, getArticleById);
articleRouter.put("/articles/:id", ownerAdminArticle, auth, updateArticleValidator, validator, updateArticle);
articleRouter.delete("/articles/:id", ownerAdminArticle, auth, validator, deleteArticle);

export default articleRouter;