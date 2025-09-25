import { Router } from "express";
import auth from "../middlewares/authMiddleware.js";
import { createComment, deleteComment, getCommentByArticle, myComments, updateComment } from "../controllers/commentControllers.js";
import { ownerAdminComment } from "../middlewares/ownerOrAdminMiddleware.js";
import validator from "../middlewares/validator.js";
import { createCommentValidator, updateCommentValidator } from "../middlewares/validators/commentValidator.js";

const commentRouter = Router();

commentRouter.post("/comments", auth, createCommentValidator, validator, createComment);
commentRouter.get("/comments/article/:id", validator, getCommentByArticle);
commentRouter.get("/comments/my", auth, myComments);
commentRouter.put("/comments/:id", ownerAdminComment, auth, updateCommentValidator, validator, updateComment);
commentRouter.delete("/comments/:id", ownerAdminComment, auth, validator, deleteComment);

export default commentRouter;

