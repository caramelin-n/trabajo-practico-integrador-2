import { body, param } from "express-validator";

// ● content: 5-500 caracteres, obligatorio.
// ● author: ObjectId válido.
// ● article: ObjectId válido que debe existir.

export const createCommentValidator = [
    body("content")
    .isLength({ min: 5, max: 500 }).withMessage("El contenido debe ser de 5-500 caracteres.")
    .notEmpty().withMessage("El contenido no debe de estar vacío."),

    body("article")
    .notEmpty().withMessage("El artículo relacionado es obligatorio.")
]

export const updateCommentValidator = [
    body("content")
    .isLength({ min: 5, max: 500 }).withMessage("El contenido debe ser de 5-500 caracteres.")
    .notEmpty().withMessage("El contenido no debe de estar vacío."),

    body("article")
    .notEmpty().withMessage("El artículo relacionado es obligatorio.")
]