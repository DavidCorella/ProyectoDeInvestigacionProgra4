
const express = require('express');
const router = express.Router();
const {getUser, setUser} = require('../../../MateriasController')

//router.route('/:user/:password/:mail').post();

router.route('/Registrar/:user/:password/:email').post((req, res) => {
    //const { user, password, email } = req.params;	
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

 module.exports = router;