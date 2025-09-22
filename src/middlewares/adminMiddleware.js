import { verifyToken } from "../helpers/jwt.helper.js";

const admin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                ok: false,
                msg: "Sin token."
            });
        };
        const decoded = await verifyToken(token);
        if(decoded.role !== "admin"){
            return res.status(403).json({
                ok: false,
                msg: "Permiso denegado."
            });
        };
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Token inválido."
        });
    };
};

export default admin;