import chalk from "chalk";
import userModel from "../models/userModel.js";

export const authRegister = async (req, res) => {
    try {
        
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