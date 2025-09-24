import { articleModel } from "../models/articleModel.js";
import { tagModel } from "../models/tagModel.js";

export const addTagArticle = async (req, res) => {
    try {
        const { article, tags } = req.body;
        await articleModel.findByIdAndUpdate(article, { $addToSet: { tags: tags } });
        await tagModel.findByIdAndUpdate(tags, { $addToSet: { article: article } });
        return res.status(200).json({
            ok: true,
            msg: "Etiqueta agregada a artículo correctamente."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno."
        });
    }
}

export const deleteTagArticle = async (req, res) => {
    try {
        const { article, tags } = req.body;
        await articleModel.findByIdAndDelete(article, { $unset: { tags: tags } });
        await tagModel.findByIdAndDelete(tags, { $unset: { article: article } });
        return res.status(200).json({
            ok: true,
            msg: "Etiqueta eliminada de artículo correctamente"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno."
        });
    }
}

