import chalk from "chalk";
import userModel from "../models/userModel.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";

export const authRegister = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const { firstName, lastName, avatarUrl, biography, birthDate } = req.body;
        const hashedPassword = await hashPassword(password);
        const isUserUnique = await userModel.findOne({ where: { username: username } });
        if (isUserUnique){
            return res.status(500).json({
                ok: false,
                msg: "El username ya está siendo utilizado."
            });
        };
        const isEmailUnique = await userModel.findOne({ where: { email: email } });
        if(isEmailUnique){
            return res.status(500).json({
                ok: false,
                msg: "El email ya está siendo utilizado."
            });
        });
        await userModel.create({ 
            username: username,
            email: email,
            role: role,
            password: hashedPassword,
        });
        await profileModel.create({
            firstName,
            lastName,
            avatarUrl,
            biography,
            birthDate
        });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno en el servidor."
        })
    }
}

export const authLogin = async (req, res) => {
    try {
        
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno en el servidor."
        });
    }
}

export const getProfile = async (req, res) => {
    try {
        
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno en el servidor."
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno en el servidor."
        })
    }
}

export const authLogout = async (req, res) => {
    try {
        
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno en el servidor."
        })
    }
}