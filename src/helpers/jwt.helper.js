import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = async (user) => {
    try {
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
        }
        return jwt.sign(payload, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error("Error al verificar el token", error)
    }
};

export const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error("Error al verificar el token", error)
    }
};