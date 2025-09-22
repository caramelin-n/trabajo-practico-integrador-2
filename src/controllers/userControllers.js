import chalk from "chalk";
import { userModel } from "../models/userModel.js";

// ● GET /api/users → Listar todos los usuarios con populate de artículos. (solo admin)
// ● GET /api/users/:id → Obtener usuario específico con artículos y comentarios. (solo
// admin)
// ● PUT /api/users/:id → Actualizar usuario (solo admin).
// ● DELETE /api/users/:id → Eliminación física de usuario (solo admin).

export const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.params.id, deletedAt: null });
        if(!user){
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado."
            });
        };
        await user.updateOne({ deletedAt: new Date() });
        return res.status(200).json({
            ok: true,
            msg: "Usuario eliminado correctamente."
        });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { username,
            email,
            password,
            role,
            firstName,
            lastName,
            biography,
            avatarUrl,
            birthDate } = req.body;
            const user = await userModel.findById(req.params.id, { deletedAt: null });
            await user.updateOne({
                username: username || user.username,
                password: password || user.password,
                email: email || user.email,
                role: role || user.role,
                profile: {
                firstName: firstName || user.profile.firstName,
                lastName: lastName || user.profile.lastName,
                biography: biography || user.profile.biography,
                avatarUrl: avatarUrl || user.profile.avatarUrl,
                birthDate: birthDate || user.profile.birthDate,
                }
            });
            const userUp = await userModel.findById(req.params.id, { deletedAt: null });
            return res.status(200).json({
                ok: true,
                msg: "Usuario actualizado correctamente",
                data: userUp
            });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno."
        });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const user = await userModel.find({ deletedAt: null }).select("-password");
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

export const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id, { deletedAt: null }).select("-password");
        if(!user){
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado."
            });
        }
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