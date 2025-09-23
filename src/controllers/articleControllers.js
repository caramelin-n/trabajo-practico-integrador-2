import chalk from "chalk";
import { articleModel } from "../models/articleModel.js";
import { verifyToken } from "../helpers/jwt.helper.js";

// ● POST /api/articles → Crear artículo. (usuario autenticado)
// ● GET /api/articles → Listar artículos publicados con populate de author y tags.
// (usuario autenticado)
// ● GET /api/articles/:id → Obtener artículo por ID con populate completo. (usuario
// autenticado)
// ● GET /api/articles/my → Listar artículos del usuario logueado. (usuario autenticado)
// ● PUT /api/articles/:id → Actualizar artículo (solo autor o admin).
// ● DELETE /api/articles/:id → Eliminación física (solo autor o admin).

export const createArticle = async (req, res) => {
    try {
        const { title, content, excerpt, status, author, tags } = req.body;
        const article = await articleModel.create({
            title,
            content,
            excerpt,
            status,
            author,
            tags
        });
        return res.status(201).json({
            ok: true,
            msg: "Artículo creado correctamente.",
            data: article
        });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        })
    }
}
export const getAllArticles = async (req, res) => {
    try {
        const article = await articleModel.find().populate({
            path: "author",
            select: "-password -deletedAt"
        });
        return res.status(200).json({
            ok: true,
            data: article
        })
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        })
    }
}
export const getArticleById = async (req, res) => {
    try {
        const article = await articleModel.findById(req.params.id).populate({
            path: "author",
            select: "-password -deletedAt"
        });
        return res.status(200).json({
            ok: true,
            data: article
        });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        })
    }
}
export const getArticleUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = await verifyToken(token);
        const id = decoded.id;
        const articles = await articleModel.find({ author: id });
        return res.status(200).json({
            ok: true,
            data: articles
        });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        })
    }
}
export const updateArticle = async (req, res) => {
    try {
        const {
            title,
            content,
            excerpt,
            status,
            author,
            tags
        } = req.body;
        const article = await articleModel.findById(req.params.id);
        await article.updateOne({
            title: title || article.title,
            content: content || article.content,
            excerpt: excerpt || article.excerpt,
            status: status || article.status,
            author: author || article.author,
            tags: tags || article.tags
        });
        const articUp = await articleModel.findById(req.params.id);
        return res.status(200).json({
            ok: true,
            msg: "Artículo actualizado correctamente.",
            data: articUp
        });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        })
    }
}
export const deleteArticle = async (req, res) => {
    try {
        const article = await articleModel.findById(req.params.id);
        if(!article){
            return res.status(404).json({
                ok: false,
                msg: "Artículo no encontrado."
            });
        }
        await article.deleteOne();
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        })
    }
}