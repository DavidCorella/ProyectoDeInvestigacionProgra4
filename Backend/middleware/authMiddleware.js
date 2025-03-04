const jwt = require('jsonwebtoken');
const config = require("../config.js");


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // No hay token

    jwt.verify(token, config.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Token no válido
        req.user = user; // Token válido
        next();
    });
};

module.exports = authenticateToken;