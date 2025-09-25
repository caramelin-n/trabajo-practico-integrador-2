import { articleModel } from "../models/articleModel.js";
import { tagModel } from "../models/tagModel.js";
import chalk from "chalk";

// ● POST /api/tags → Crear etiqueta (solo admin).
// ● GET /api/tags → Listar todas las etiquetas. (usuario autenticado)
// ● GET /api/tags/:id → Obtener etiqueta con populate de artículos asociados (usuario
// autenticado).
// ● PUT /api/tags/:id → Actualizar etiqueta (solo admin).
// ● DELETE /api/tags/:id → Eliminar etiqueta (solo admin).

export const deleteTag = async (req, res) => {
    try {
        const article = await articleModel.findById(req.params.id);
        const { tagId } = req.params;
        await tagModel.findByIdAndDelete(req.params.tagId);
        await article.updateOne({
            $pull: { tags: tagId }
        })
        return res.status(200).json({
            ok: true,
            msg: "Etiqueta borrada correctamente."
        });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        });
    }
}

export const updateTag = async (req, res) => {
    try {
        const { name, description } = req.body;
        const tag = await tagModel.findById(req.params.id);
        await tag.updateOne({
            name: name || tag.name,
            description: description || tag.description,
        });
        const tagUp = await tagModel.findById(req.params.id)
        return res.status(200).json({
            ok: true,
            msg: "Etiqueta actualizada correctamente.",
            data: tagUp
        });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        });
    }
}

export const getTagById = async (req, res) => {
    try {
        const tag = await tagModel.findById(req.params.id);
        return res.status(200).json({
            ok: true,
            data: tag
        })
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        });
    }
}

export const getAllTags = async (req, res) => {
    try {
        const tag = await tagModel.find();
        return res.status(200).json({
            ok: true,
            data: tag
        });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        });
    }
}

export const createTag = async (req, res) => {
    try {
        const { name, description } = req.body;
        const tag = await tagModel.create({
            name,
            description
        });
        return res.status(201).json({
            ok: true,
            msg: "Etiqueta creada correctamente.",
            data: tag
        });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        });
    }
}