import jwt from 'jsonwebtoken';
export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        res
            .status(401)
            .json({ message: "No autorizado: Token no proporcionado" });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Token inválido o expirado" });
        return;
    }
};
