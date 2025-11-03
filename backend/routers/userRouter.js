const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const userModel = require('../models/userModel');

// Routes d'authentification
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/verify', userController.verify);
router.post('/reinitialize', userController.reinitialize);
router.patch('/reset-password', userController.resetPassword);

// Routes utilisateur
router.get('/', userController.getAll);
router.patch('/:id', userController.updateUser);

module.exports = router;