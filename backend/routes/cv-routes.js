const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cv-controller');

// GET route to fetch a CV by its ID
router.get('/:cvId/download', cvController.downloadCV);


module.exports = router;
