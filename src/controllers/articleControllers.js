import chalk from "chalk";
import { articleModel } from "../models/articleModel.js";

export const createArticle = async (req, res) => {
    try {
         
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
        
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        })
    }
}