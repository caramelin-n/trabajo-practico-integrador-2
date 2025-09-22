import chalk from "chalk";
import { userModel } from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken, verifyToken } from "../helpers/jwt.helper.js";

export const authRegister = async (req, res) => {
    try {
        const { username, email, password, role, firstName, lastName, avatarUrl, biography, birthDate } = req.body;
        const hashedPassword = await hashPassword(password);
        const isUserUnique = await userModel.findOne({ username: username });
        if (isUserUnique){
            return res.status(500).json({
                ok: false,
                msg: "El username ya está siendo utilizado."
            });
        };
        const isEmailUnique = await userModel.findOne({ email: email });
        if(isEmailUnique){
            return res.status(500).json({
                ok: false,
                msg: "El email ya está siendo utilizado."
            });
        };
        await userModel.create({ 
            username,
            email,
            role,
            password: hashedPassword,
            profile:{
            firstName,
            lastName,
            avatarUrl,
            biography,
            birthDate
            }
        });
        return res.status(201).json({
            ok: true,
            msg: "Registrado correctamente."
        })
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
        const { username, password } = req.body;
        const user = await userModel.findOne({ username: username });
        if(!user){
            return res.status(401).json({
                ok: false,
                msg: "Credenciales inválidas."
            });
        }
        const passOk = await comparePassword(password, user.password);
        if(!passOk){
            return res.status(401).json({
                ok: false,
                msg: "Credenciales inválidas"
            });
        }
        await generateToken(user, res);
        return res.status(200).json({
            ok: true,
            msg: "Sesión iniciada correctamente."
        })
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
        const token = req.cookies.token;
        const info = await verifyToken(token);
        const user = await userModel.findById(info.id).select("");
        return res.status(200).json({
            ok: true,
            msg:"perfil obtenido correctamente",
            data: user.profile
        });

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
        const token = req.cookies.token;
        console.log(token)
        const info = await verifyToken(token);
        const { firstName, lastName, avatarUrl, biography, birthDate } = req.body;
        const user = await userModel.findById(info.id);
        await user.updateOne({
            profile: {
            firstName: firstName || user.profile.firstName,
            lastName: lastName || user.profile.lastName,
            biography: biography || user.profile.biography,
            avatarUrl: avatarUrl || user.profile.avatarUrl,
            birthDate: birthDate || user.profile.birthDate,
        }});
        const userUp = await userModel.findById(info.id);
        return res.status(200).json({
            ok: true,
            msg: "Perfil actualizado con éxito.",
            data: userUp
        });
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
        res.clearCookie("token");
        return res.status(200).json({
            ok: true,
            msg: "Logout realizado correctamente."
        });
    } catch (error) {
        console.error(chalk.redBright(error));
        res.status(500).json({
            ok: false,
            msg: "Error interno en el servidor."
        })
    }
}