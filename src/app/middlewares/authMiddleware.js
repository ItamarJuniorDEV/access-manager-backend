import jwt from 'jsonwebtoken';

export function authenticateJWT(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: "Não autorizado" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        req.user = user;
        next();
    });
}