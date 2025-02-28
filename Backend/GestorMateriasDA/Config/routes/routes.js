
const express = require('express');
const router = express.Router();
const {getUser, setUser} = require('../../../MateriasController')

router.route('/').get(getUser).post(setUser)

module.exports = router;