import { body } from "express-validator";
import { tagModel } from "../../models/tagModel.js";

// ● name: 2-30 caracteres, único, obligatorio, sin espacios.
// ● description: máximo 200 caracteres.

export const bodyTagValidator = [
    body("name")
    .isLength({ min: 2, max: 30 }).withMessage("El name debe tener entre 2-30 caracteres.")
    .custom(async (value) => {
        const tag = await tagModel.findOne({ name: value });
        if(tag && tag._id.toString() !== req.params.id){
            throw new Error("El nombre de la etiqueta debe ser único.");
        }
    })
    .notEmpty().withMessage("El nombre de la etiqueta no debe de ser vacío.")
    .matches(/^[A-Za-z0-9_-]+$/).withMessage("El nombre de la etiqueta no debe contener espacios."),

    body("description")
    .isLength({ max: 200 }).withMessage("La descripción de la etiqueta no debe de tener más de 500 caracteres.")
]