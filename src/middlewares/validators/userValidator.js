import { body, param } from "express-validator";
import { userModel } from "../../models/userModel.js";

// ● username: 3-20 caracteres, alfanumérico, único.
// ● email: formato válido, único.
// ● password: mínimo 8 caracteres, al menos una mayúscula, minúscula y número.
// ● role: solo valores permitidos ('user', 'admin').

export const bodyUserValidator = [
    body("username")
    .isAlphanumeric().withMessage("El username debe ser alfanumérico.")
    .isLength({ min: 3, max: 20 }).withMessage("El username debe tener entre 3-20 caracteres.")
    .custom( async (value) => {
        const isUserUnique = await userModel.findOne({ username: value });
        if(isUserUnique && isUserUnique._id.toString() !== req.params.id){
            throw new Error("El username debe ser único.");
        }
    }),

    body("email")
    .custom(async (value) => {
        const isEmailUnique = await userModel.findOne({ email: email });
        if (isEmailUnique && isEmailUnique._id.toString() !== req.params.id){
            throw new Error("El email debe ser único");
        }
    })
    .isEmail().withMessage("El email debe ser válido."),
    
    body("password")
    .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres.")
    .matches(/[A-Z]/).withMessage("La contraseña debe contener al menos una letra mayúscula.")
    .matches(/[a-z]/).withMessage("La contraseña debe contener al menos una letra minúscula.")
    .matches(/[0-9]/).withMessage("La contraseña debe contener al menos un número."),

    body("role")
    .isIn(["user", "admin"]).withMessage("El rol solo debe ser user o admin."),

    body("profile.firstName")
    .isLength({ min: 2, max: 50 }).withMessage("El nombre debe tener entre 2 y 50 caracteres.")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/).withMessage("El nombre solo puede contener letras."),
  
    body("profile.lastName")
    .isLength({ min: 2, max: 50 }).withMessage("El apellido debe tener entre 2 y 50 caracteres.")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/).withMessage("El apellido solo puede contener letras."),
  
    body("profile.biography")
    .optional()
    .isLength({ max: 500 }).withMessage("La biografía debe tener menos de 500 caracteres."),
  
    body("profile.avatarUrl")
    .optional()
    .isURL().withMessage("El avatar debe ser una URL válida.")
]