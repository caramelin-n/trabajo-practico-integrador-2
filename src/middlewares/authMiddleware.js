const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token){
            return res.status(401).json({
                ok: false,
                msg: "Usuario no autenticado."
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Token inválido"
        });
    }
}

export default auth;