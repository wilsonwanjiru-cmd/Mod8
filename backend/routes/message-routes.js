const express = require('express');
const { createMessage } = require('../controllers/messages-controller');

const router = express.Router();

// Route to handle message creation
router.post('/', createMessage);

module.exports = router;
