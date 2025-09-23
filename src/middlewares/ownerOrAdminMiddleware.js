import { verifyToken } from "../helpers/jwt.helper.js";
import { articleModel } from "../models/articleModel.js";
import { commentModel } from "../models/commentModel.js";

export const ownerAdminArticle = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = await verifyToken(token);
        if(decoded.role !== "admin"){
            const article = await articleModel.findById(req.params.id);
            if(!article){
                return res.status(404).json({
                    ok: false,
                    msg: "Artículo no encontrado.",
                });
            }
            if (toString(articleModel.author) == decoded.id){
                next();
            }
            return res.status(403).json({
                ok: false,
                msg: "Sin autorización"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error interno"
        });
    }
}

export const ownerAdminComment = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = await verifyToken(token);
        if(decoded.role !== "admin"){
            const comment = await articleModel.findById(req.params.id);
            if(!comment){
                return res.status(404).json({
                    ok: false,
                    msg: "Comentario no encontrado",
                });
            }
            if (toString(commentModel.author) == decoded.id){
                next();
            }
            return res.status(403).json({
                ok: false,
                msg: "Sin autorización"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error interno"
        });
    }
}