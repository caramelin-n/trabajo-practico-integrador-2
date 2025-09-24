import { verifyToken } from "../helpers/jwt.helper.js";
import { commentModel } from "../models/commentModel.js";

// ● POST /api/comments → Crear comentario en artículo. (usuario autenticado)
// ● GET /api/comments/article/:articleId → Listar comentarios de un artículo con
// populate de author. (usuario autenticado)
// ● GET /api/comments/my → Listar comentarios del usuario logueado. (usuario
// autenticado)
// ● PUT /api/comments/:id → Actualizar comentario (solo autor o admin).
// ● DELETE /api/comments/:id → Eliminación física de comentario (solo autor o
// admin).

export const deleteComment = async (req, res) => {
    try {
        await commentModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            ok: true,
            msg: "Comentario eliminado."
        });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        });
    }
}

export const updateComment = async (req, res) => {
    try {
        const { content, author, article } = req.body;
        const comment = await commentModel.findById(req.params.id);
        await comment.updateOne({
            content: content || comment.content,
            author: author || comment.author,
            article: article || comment.article
        });
        const commentUp = await commentModel.findById(req.params.id)
        return res.status(200).json({
            ok: true,
            msg: "Comentario actualizado correctamente.",
            data: commentUp
        });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        });
    }
}

export const myComments = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = await verifyToken(token);
        const comment = await commentModel.find({ author: decoded.id });
        return res.status(200).json({
            ok: true,
            data: comment
        });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        });
    }
}

export const createComment = async (req, res) => {
    try {
        const { content, article } = req.body;
        const token = req.cookies.token;
        const decoded = await verifyToken(token);
        const comment = await commentModel.create({
            content,
            author: decoded.id,
            article
        });
        return res.status(201).json({
            ok: true,
            msg: "Comentario creado correctamente.",
            data: comment
        });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        });
    }
}

export const getCommentByArticle = async (req, res) => {
    try {
        const comment = await commentModel.find({ article: req.params.id }).populate({
            path: "author",
            select: "-password -deletedAt"
        });
        return res.status(200).json({
            ok: true,
            data: comment
        });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        });
    }
}