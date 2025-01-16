const express = require('express');
const router = express.Router();
const userController = require('./UserController')

router.route('/users').get(userController.getAllUsers)
router.route('/users/register').post(userController.Register)
router.route('/users/login').post(userController.Login)

module.exports = router;