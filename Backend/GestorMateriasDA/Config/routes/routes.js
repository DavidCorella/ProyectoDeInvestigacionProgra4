
const express = require('express');
const router = express.Router();
const { getUser, setUser } = require('../../../MateriasController')


router.route('/auth/register/:user/:password/:email').post((req, res) => {
    setUser(req.params.user, req.params.password, req.params.email).then(() => {
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

router.route("/users/:id").get((req, res) => {

        getUser(req.params.id).then((param)=>{
            console.log(param);
            res.status(200).json(param);
        }).catch ((error) => {
        res.status(500).json({ message: error.message });
        });
});


module.exports = router;