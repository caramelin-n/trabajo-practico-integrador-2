import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = async (user, res) => {
    try {
        const payload = {
            id: user._id,
            username: user.username,
            role: user.role,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: "1h"});
        console.log(token)
        return res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
    } catch (error) {
        console.log(error);
        throw new Error("Error al generar el token", error)
    }
};

export const verifyToken = async (token) => {
    try {
        
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.log(error)
        throw new Error("Error al verificar el token", error)
    }
};