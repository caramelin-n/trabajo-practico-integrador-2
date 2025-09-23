import { Router } from "express";
import auth from "../middlewares/authMiddleware.js";
import { createComment, deleteComment, getCommentByArticle, myComments, updateComment } from "../controllers/commentControllers.js";
import { ownerAdminComment } from "../middlewares/ownerOrAdminMiddleware.js";

const commentRouter = Router();

commentRouter.post("/comments", auth, createComment);
commentRouter.get("/comments/article/:id", getCommentByArticle);
commentRouter.get("/comments/my", auth, myComments);
commentRouter.put("/comments/:id", ownerAdminComment, auth, updateComment);
commentRouter.delete("/comments/:id", ownerAdminComment, auth, deleteComment )

export default commentRouter;

