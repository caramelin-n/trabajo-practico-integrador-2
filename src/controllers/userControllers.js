import chalk from "chalk";
import { userModel } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
    try {
        const user = await userModel.find()
        return res.status(200).json({
            ok: true,
            data: user
        });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        });
    }
}