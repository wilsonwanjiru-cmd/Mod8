const express = require('express');
const usersControllers = require('../controllers/messages-controller');

const router = express.Router();

// Signup Route
router.post('/signup', usersControllers.signup);

// Login Route
router.post('/login', usersControllers.login);

module.exports = router;