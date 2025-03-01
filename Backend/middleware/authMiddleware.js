
const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado, token no proporcionado' });
    }

    try {
        const descodificado = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = descodificado.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido o expirado' });
    }
}

module.exports = { verificarToken };