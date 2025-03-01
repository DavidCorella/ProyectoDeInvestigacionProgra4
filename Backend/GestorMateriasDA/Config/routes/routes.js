
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUser, setUser, getUserBy, putUser } = require('../../../MateriasController');
require('dotenv').config();
const { default: Usuario } = require('../../../GestorMateriasBC/Modelos/Usuario');

router.route('/auth/register').post((req, res) => {

    const { user, password, email } = req.body;
    getUserBy(user).then((param) => {
        if (param) {
            return res.status(400).json({
                message: 'Usuario encontrado, por favor dígite otro'
            });
        }

        getUserBy(email).then((param) => {
            if (param) {
                return res.status(400).json({
                    message: 'Email encontrado, por favor dígite otro'
                });
            }

            return bcrypt.hash(password, 8).then((hashedPassword) => {
                setUser(user, hashedPassword, email).then(() => {

                    res.status(200).json({
                        message: 'Usuario creado correctamente'
                    });
                }).catch((error) => {
                    res.status(500).json({
                        message: 'Error creando usuario',
                        error: error.message
                    });
                });
            });
        });
    });
});

router.route("/users/:id").get((req, res) => {

    getUser(req.params.id).then((param) => {
        res.status(200).json(param);
    }).catch((error) => {
        res.status(500).json({ message: error.message });
    });
});

router.route('/auth/login').post((req, res) => {

    const { user, password } = req.body;

    getUserBy(user).then((param) => {
        if (!param) {
            return res.status(400).json({
                message: 'Usuario no encontrado'
            });
        }

        bcrypt.compare(password, param.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error al comparar las contraseñas',
                    error: err.message
                });
            }
            if (!isMatch) {
                return res.status(400).json({ message: "Contraseña incorrecta" });
            }

            const payload = { userId: param._id };
            const secretKey = process.env.JWT_SECRET;
            jwt.sign(payload, secretKey, { expiresIn: "12h" }, (err, token) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Error al generar el token',
                        error: err.message
                    });
                }

                res.status(200).json({
                    message: 'Inicio de sesión exitoso',
                    token: token
                });
            });

        })
    }).catch((error) => {
        res.status(500).json({
            message: error.message
        });
    });
});

router.route("/users/:id").put((req, res) => {

    const { user, password, email } = req.body;
    const { id } = req.params;
    getUserBy(user).then((param) => {
        if (!param) {
            return res.status(400).json({
                message: 'Usuario no encontrado, por favor verifique la información'
            });
        }

        if (param.email == email) {
            return bcrypt.hash(password, 8).then((hashedPassword) => {
                putUser(id, user, hashedPassword, email).then((param) => {
                    res.status(200).json(param);
                }).catch((error) => {
                    res.status(500).json({ message: error.message });
                });
            });
        }
        else {
            getUserBy(email).then((param) => {
                if (param) {
                    return res.status(400).json({
                        message: 'Email encontrado, por favor dígite otro'
                    });
                }

                return bcrypt.hash(password, 8).then((hashedPassword) => {
                    putUser(id, user, hashedPassword, email).then((param) => {
                        res.status(200).json(param);
                    }).catch((error) => {
                        res.status(500).json({ message: error.message });
                    });
                });
            });
        }
    });

});

module.exports = router;