import { body, param } from "express-validator";

// ● title: 3-200 caracteres, obligatorio.
// ● content: mínimo 50 caracteres, obligatorio.
// ● excerpt: máximo 500 caracteres.
// ● status: solo valores permitidos ('published', 'archived').
// ● author: ObjectId válido que debe coincidir con usuario autenticado (excepto admin).

export const createArticleValidator = [
    body("title")
    .isLength({ min: 3, max: 200 }).withMessage("El título debe ser de entre 3-200 caracteres")
    .notEmpty().withMessage("El título no debe de estar vacío."),

    body("content")
    .isLength({ min: 50 }).withMessage("El contenido debe ser de al menos 50 caracteres.")
    .notEmpty().withMessage("El contenido no debe de estar vacío."),

    body("excerpt")
    .isLength({ max: 500 }).withMessage("La nota debe ser de máximo 500 caracters."),

    body("status")
    .isIn(["published", "archived"]).withMessage("El status sólo puede ser published o archived."),
]

export const updateArticleValidator = [
    body("title")
    .isLength({ min: 3, max: 200 }).withMessage("El título debe ser de entre 3-200 caracteres")
    .notEmpty().withMessage("El título no debe de estar vacío."),

    body("content")
    .isLength({ min: 50 }).withMessage("El contenido debe ser de al menos 50 caracteres.")
    .notEmpty().withMessage("El contenido no debe de estar vacío."),

    body("excerpt")
    .isLength({ max: 500 }).withMessage("La nota debe ser de máximo 500 caracters."),

    body("status")
    .isIn(["published", "archived"]).withMessage("El status sólo puede ser published o archived."),
]